#!/usr/bin/env node
/**
 * publish-newsletter.mjs
 *
 * Queries the Outlook SQLite DB for "The Apartment Update" newsletter issues,
 * extracts/cleans content from their Mailchimp archive pages, and appends new
 * issues to src/data/articles.json + creates src/content/{slug}.md files.
 *
 * Usage:
 *   node scripts/publish-newsletter.mjs              # last 30 days (default)
 *   node scripts/publish-newsletter.mjs --days 90    # last 90 days
 *   node scripts/publish-newsletter.mjs --days 365   # last year
 *   node scripts/publish-newsletter.mjs --dry-run    # show what would be added, don't write
 *
 * Requirements:
 *   - better-sqlite3: npm install better-sqlite3
 *   - The Outlook SQLite DB must be accessible at the standard macOS path.
 *   - Mailchimp campaign archive pages must be publicly accessible.
 *
 * Deduplication:
 *   Skips any issue whose date (YYYY-MM-DD) + normalized title already exists
 *   in articles.json.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const OUTLOOK_DB = join(
  process.env.HOME,
  'Library/Group Containers/UBF8T346G9.Office/Outlook/Outlook 15 Profiles/Main Profile/Data/Outlook.sqlite'
);
const ARTICLES_PATH = join(ROOT, 'src/data/articles.json');
const CONTENT_DIR = join(ROOT, 'src/content');
const MAILCHIMP_USER_ID = '87232bcc93f1dd394870ffcbd';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const daysIdx = args.indexOf('--days');
const DAYS = daysIdx >= 0 ? parseInt(args[daysIdx + 1], 10) || 30 : 30;
const DRY_RUN = args.includes('--dry-run');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Query Outlook DB via sqlite3 CLI (avoids native module dependency) */
function queryOutlook(sql) {
  const cmd = `sqlite3 -json "${OUTLOOK_DB}" "${sql.replace(/"/g, '\\"')}"`;
  const out = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  if (!out.trim()) return [];
  return JSON.parse(out);
}

/** Extract Mailchimp campaign ID from an olk15Message file */
function extractCampaignId(filePath) {
  try {
    const cmd = `strings "${filePath}" | grep 'X-Campaign:' | head -1`;
    const line = execSync(cmd, { encoding: 'utf8' }).trim();
    // X-Campaign: mailchimp<userId>.<campaignId>
    const match = line.match(/X-Campaign:\s*mailchimp[^.]+\.(\w+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/** Fetch Mailchimp archive page and extract newsletter text */
async function fetchArchiveContent(campaignId) {
  const url = `https://us20.campaign-archive.com/?u=${MAILCHIMP_USER_ID}&id=${campaignId}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const html = await resp.text();
    return { html, url };
  } catch {
    return null;
  }
}

/** Very basic HTML → Markdown conversion for newsletter body */
function htmlToMarkdown(html) {
  let text = html;

  // Remove script/style tags
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Headers
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');

  // Bold / italic
  text = text.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  text = text.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  text = text.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  text = text.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');

  // Links
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Lists
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  text = text.replace(/<\/?[ou]l[^>]*>/gi, '\n');

  // Paragraphs / line breaks
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<p[^>]*>/gi, '');

  // Horizontal rules
  text = text.replace(/<hr[^>]*>/gi, '\n---\n');

  // Remove remaining tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&mdash;/g, '—');

  // Clean up whitespace
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}

/** Strip email boilerplate from markdown content */
function stripBoilerplate(md) {
  // Remove common newsletter footer patterns
  const cutPatterns = [
    /^.*unsubscribe.*$/gim,
    /^.*view (this email |in your )?browser.*$/gim,
    /^.*update your preferences.*$/gim,
    /^.*tracking pixel.*$/gim,
    /^.*Copyright \d{4}.*$/gim,
    /^\*\|.*\|\*$/gm,
  ];
  let text = md;
  for (const pat of cutPatterns) {
    text = text.replace(pat, '');
  }

  // Remove "When you're ready" CTA section and everything after "See you next week"
  const ctaCut = text.search(/##\s*When you['']re ready/i);
  if (ctaCut > 0) text = text.slice(0, ctaCut).trim();

  const signoffCut = text.search(/See you next week\./i);
  if (signoffCut > 0) {
    const afterSignoff = text.indexOf('\n', signoffCut);
    if (afterSignoff > 0) text = text.slice(0, afterSignoff).trim();
  }

  // Remove signature blocks
  text = text.replace(/Dayma\s+Itamunoala[\s\S]*?Sales Representative[\s\S]*?colliers\.com/gi, '');

  // Clean trailing whitespace
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  // Ensure trailing ---
  if (!text.endsWith('---')) text += '\n\n---\n';

  return text;
}

/** Generate a URL-safe slug from title */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Estimate read time from word count */
function readTime(text) {
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 250));
  return `${mins} min read`;
}

/** Format unix timestamp as YYYY-MM-DD in local time */
function formatDate(ts) {
  const d = new Date(ts * 1000);
  return d.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n📰 Newsletter Publisher — scanning last ${DAYS} days${DRY_RUN ? ' (DRY RUN)' : ''}\n`);

  // 1. Load existing articles
  const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
  const existingKeys = new Set(articles.map(a => `${a.date}|${a.id}`));

  // 2. Query for Apartment Update newsletters (sent by "Dayma Itamunoala" via Mailchimp)
  const cutoff = Math.floor(Date.now() / 1000) - DAYS * 86400;
  const sql = `
    SELECT Message_TimeReceived, Message_NormalizedSubject, PathToDataFile
    FROM Mail
    WHERE Message_NormalizedSubject LIKE '%The Apartment Update%'
      AND Message_SenderList LIKE '%Dayma Itamunoala%'
      AND Message_NormalizedSubject NOT LIKE '%Test%'
      AND Message_NormalizedSubject NOT LIKE '%IMPORTANT%'
      AND Message_NormalizedSubject NOT LIKE '%OPTIN%'
      AND Message_TimeReceived > ${cutoff}
    ORDER BY Message_TimeReceived ASC
  `.replace(/\n/g, ' ');

  const rows = queryOutlook(sql);
  console.log(`  Found ${rows.length} raw rows in Outlook DB`);

  // 3. Dedupe by normalized subject + week
  const seen = new Map();
  for (const row of rows) {
    const subject = row.Message_NormalizedSubject
      .replace(/^\[.*?\]\s*/, '')  // strip [MARKETING] etc.
      .replace(/^\s+/, '')
      .trim();
    const date = formatDate(row.Message_TimeReceived);
    const weekKey = `${date.slice(0, 7)}|${subject}`;  // month + subject
    if (!seen.has(weekKey)) {
      seen.set(weekKey, { ...row, normalizedSubject: subject, date });
    }
  }

  const distinct = [...seen.values()];
  console.log(`  ${distinct.length} distinct issue(s) after dedup\n`);

  if (distinct.length === 0) {
    console.log('  No new Apartment Update issues found.\n');
    return;
  }

  // 4. Process each issue
  let added = 0;
  for (const issue of distinct) {
    const slug = slugify(issue.normalizedSubject);
    const key = `${issue.date}|${slug}`;

    if (existingKeys.has(key)) {
      console.log(`  ⏭  Already exists: ${issue.date} — ${issue.normalizedSubject}`);
      continue;
    }

    // Extract campaign ID from olk15Message
    const msgPath = join(
      process.env.HOME,
      'Library/Group Containers/UBF8T346G9.Office/Outlook/Outlook 15 Profiles/Main Profile/Data',
      issue.PathToDataFile
    );
    const campaignId = extractCampaignId(msgPath);

    let content = null;
    let archiveUrl = null;

    if (campaignId) {
      const archive = await fetchArchiveContent(campaignId);
      if (archive) {
        archiveUrl = archive.url;
        let md = htmlToMarkdown(archive.html);
        md = stripBoilerplate(md);
        content = md;
      }
    }

    if (!content) {
      console.log(`  ⚠️  Could not extract content for: ${issue.date} — ${issue.normalizedSubject}`);
      continue;
    }

    // Generate article entry
    const subtitle = issue.normalizedSubject.replace(/^The Apartment Update:\s*/i, '').trim();
    const excerpt = content
      .replace(/^#.*$/m, '')
      .replace(/\*\*/g, '')
      .trim()
      .split('\n')
      .filter(l => l.trim().length > 20)
      .slice(0, 2)
      .join(' ')
      .slice(0, 200)
      .trim();

    const article = {
      id: slug,
      title: issue.normalizedSubject,
      date: issue.date,
      excerpt: excerpt || subtitle,
      author: 'Dayma Itamunoala',
      readTime: readTime(content),
      category: 'The Apartment Update',
      tags: ['apartment update', 'newsletter', 'market update'],
      image: '/images/articles/newsletter-header.png',
      featured: true,
      mailchimpUrl: archiveUrl || '',
    };

    if (DRY_RUN) {
      console.log(`  🔍 Would add: ${issue.date} — ${issue.normalizedSubject}`);
      console.log(`     Slug: ${slug}`);
      console.log(`     Read time: ${article.readTime}`);
      console.log(`     Archive: ${archiveUrl || 'N/A'}`);
    } else {
      // Write content file
      const contentPath = join(CONTENT_DIR, `${slug}.md`);
      if (!existsSync(contentPath)) {
        writeFileSync(contentPath, content, 'utf8');
        console.log(`  ✅ Created: src/content/${slug}.md`);
      }

      // Add to articles array (insert at correct position by date, newest first)
      let insertIdx = 0;
      while (insertIdx < articles.length && articles[insertIdx].date > article.date) {
        insertIdx++;
      }
      articles.splice(insertIdx, 0, article);
      existingKeys.add(key);
      added++;
      console.log(`  ✅ Added: ${issue.date} — ${issue.normalizedSubject}`);
    }
  }

  // 5. Write updated articles.json
  if (!DRY_RUN && added > 0) {
    writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2) + '\n', 'utf8');
    console.log(`\n  📝 Updated articles.json — ${added} article(s) added`);
  }

  console.log(`\nDone. ${DRY_RUN ? '(dry run — nothing written)' : `${added} issue(s) published.`}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
