#!/usr/bin/env python3
"""
Backfill historical Apartment Update newsletters (Sept 2023 - April 2025).
Fetches Mailchimp archive pages, converts to markdown, updates articles.json.
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).parent.parent
ARTICLES_PATH = ROOT / "src/data/articles.json"
CONTENT_DIR = ROOT / "src/content"
USER_ID = "87232bcc93f1dd394870ffcbd"

NEWSLETTERS = [
    ("2023-09-27", "AU#46: GST Waiver Explained", "5ece2b9509"),
    ("2023-10-06", "AU#47: Don't Ask Questions", "42d3e008ed"),
    ("2023-10-13", "AU#48: GTA Apartment Report Now Available", "7fc3c97d17"),
    ("2023-10-20", "AU#49: No Bridge to CMHC", "3bfee7f9ab"),
    ("2023-11-10", "AU#48: CAPREIT's Earnings Call", "532f30f360"),
    ("2023-11-24", "AU#49: Black Friday and the Capital Gains Inclusion Rate", "16f322b28f"),
    ("2023-12-07", "AU#50: List of 2024 Market Outlooks", "8204ad39dd"),
    ("2024-01-16", "AU#51: Back Like We Never Left", "1a274793d5"),
    ("2024-02-02", "AU#52: Year End Multifamily Report Available", "4f2044b195"),
    ("2024-02-16", "AU#53: CMHC Rental Report Breakdown", "cb295af46e"),
    ("2024-04-04", "AU#55: Big Data in Multifamily", "be6c5308ac"),
    ("2024-04-25", "AU#56: Federal Budget Webinar (save to calendar)", "82777d8abf"),
    ("2024-05-03", "AU#57: May Multifamily Listings", "cc861106fb"),
    ("2024-05-24", "AU#58: Are You Excited?", "5d89626b32"),
    ("2024-06-05", "AU#59: Game-Changing CMHC Updates + Rate Cut", "32f24a9af8"),
    ("2024-07-24", "AU#59: Mid-Year Pulse Check (Multifamily)", "e8088cec82"),
    ("2024-08-15", "AU#60: Insurance Premiums Soften", "7794764c3d"),
    ("2024-08-30", "AU#61: Bond Yields Drop 80 Bps in 90 Days", "010ce33333"),
    ("2024-09-19", "AU#62: State of the Canadian Economy", "58a15821ae"),
    ("2024-10-08", "AU#63: Deals of the Week", "0b50364c66"),
    ("2024-11-26", "AU#65: Trade War via Tweet", "b5b6595748"),
    ("2024-12-19", "AU#66: Put A Ribbon On It", "5c5c8f58ca"),
    ("2025-01-14", "AU#67: Value Add Vs. New Build", "96258b27bc"),
    ("2025-02-04", "Impact from Trade War, Capital Gains, and Bond Yields", "a0537b5420"),
    ("2025-03-21", "Market Sentiment & Buyers That Need To Place Capital", "2f21bc0a54"),
    ("2025-04-25", "Pierre's Canadian 1031 Exchange", "55e9f52fcf"),
    ("2025-04-29", "Post-Election: What This Means For Multifamily Owners", "7f73265055"),
]


def slugify(title):
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s[:80]


def fetch_url(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                },
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                return None
    return None


def html_to_markdown(html):
    """Convert newsletter HTML to clean markdown."""
    text = html

    # Remove script/style/head
    text = re.sub(r"<script[\s\S]*?</script>", "", text, flags=re.IGNORECASE)
    text = re.sub(r"<style[\s\S]*?</style>", "", text, flags=re.IGNORECASE)
    text = re.sub(r"<head[\s\S]*?</head>", "", text, flags=re.IGNORECASE)

    # Remove tracking pixels and spacer images
    text = re.sub(r'<img[^>]*(tracking|pixel|spacer|1x1|blank|clear)[^>]*/?>',
                  "", text, flags=re.IGNORECASE)

    # Headers
    text = re.sub(r"<h1[^>]*>([\s\S]*?)</h1>", r"\n# \1\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<h2[^>]*>([\s\S]*?)</h2>", r"\n## \1\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<h3[^>]*>([\s\S]*?)</h3>", r"\n### \1\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<h4[^>]*>([\s\S]*?)</h4>", r"\n#### \1\n", text, flags=re.IGNORECASE)

    # Bold / italic
    text = re.sub(r"<strong[^>]*>([\s\S]*?)</strong>", r"**\1**", text, flags=re.IGNORECASE)
    text = re.sub(r"<b[^>]*>([\s\S]*?)</b>", r"**\1**", text, flags=re.IGNORECASE)
    text = re.sub(r"<em[^>]*>([\s\S]*?)</em>", r"*\1*", text, flags=re.IGNORECASE)
    text = re.sub(r"<i[^>]*>([\s\S]*?)</i>", r"*\1*", text, flags=re.IGNORECASE)

    # Links
    text = re.sub(
        r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>([\s\S]*?)</a>',
        r"[\2](\1)",
        text,
        flags=re.IGNORECASE,
    )

    # Lists
    text = re.sub(r"<li[^>]*>([\s\S]*?)</li>", r"\n- \1", text, flags=re.IGNORECASE)
    text = re.sub(r"<[/]?[uod]l[^>]*>", "\n", text, flags=re.IGNORECASE)

    # Line breaks and paragraphs
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</p>", "\n\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<p[^>]*>", "", text, flags=re.IGNORECASE)

    # Divs
    text = re.sub(r"</div>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<div[^>]*>", "", text, flags=re.IGNORECASE)

    # Table cells (simple)
    text = re.sub(r"<td[^>]*>", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"</td>", " | ", text, flags=re.IGNORECASE)
    text = re.sub(r"<tr[^>]*>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</tr>", "", text, flags=re.IGNORECASE)
    text = re.sub(r"<t[bh][^>]*>", "", text, flags=re.IGNORECASE)
    text = re.sub(r"</t[bh]>", "", text, flags=re.IGNORECASE)
    text = re.sub(r"<table[^>]*>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</table>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<th[^>]*>([\s\S]*?)</th>", r"**\1** | ", text, flags=re.IGNORECASE)

    # Horizontal rules
    text = re.sub(r"<hr[^>]*>", "\n\n---\n\n", text, flags=re.IGNORECASE)

    # Remove remaining tags
    text = re.sub(r"<[^>]+>", "", text)

    # HTML entities
    entities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&apos;": "'",
        "&nbsp;": " ",
        "&ndash;": "–",
        "&mdash;": "—",
        "&lsquo;": "'",
        "&rsquo;": "'",
        "&ldquo;": "\u201c",
        "&rdquo;": "\u201d",
        "&hellip;": "…",
        "&bull;": "•",
        "&copy;": "©",
        "&reg;": "®",
        "&trade;": "™",
        "&#8217;": "'",
        "&#8216;": "'",
        "&#8220;": "\u201c",
        "&#8221;": "\u201d",
        "&#8211;": "–",
        "&#8212;": "—",
        "&#160;": " ",
    }
    for ent, rep in entities.items():
        text = text.replace(ent, rep)
    # Numeric entities
    text = re.sub(r"&#(\d+);", lambda m: chr(int(m.group(1))), text)
    text = re.sub(r"&#x([0-9a-fA-F]+);", lambda m: chr(int(m.group(1), 16)), text)

    # Clean up whitespace
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n[ \t]+", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()

    return text


def strip_boilerplate(md, title):
    """Remove newsletter boilerplate from markdown."""
    lines = md.split("\n")
    cleaned = []

    # Patterns that indicate boilerplate
    boilerplate_patterns = [
        r"unsubscribe",
        r"update your preferences",
        r"view (this )?email in (your )?browser",
        r"view in browser",
        r"copyright \d{4}",
        r"\*\|.*\|\*",
        r"mailchimp",
        r"colliers international",
        r"you are receiving this",
        r"add us to your address book",
        r"our mailing address",
        r"was sent to",
        r"don't want (to receive )?these",
        r"forward this email",
        r"suite \d+",
        r"^sales representative$",
        r"^vice president",
        r"^colliers$",
        r"^\s*\|\s*$",
    ]

    # Stop patterns (cut everything after these)
    stop_patterns = [
        r"when you.?re ready",
        r"see you next week",
        r"see you (in )?next (time|issue)",
        r"unsubscribe (from|all)",
        r"you received this email",
        r"our mailing address is",
        r"copyright.*all rights reserved",
        r"^\s*©\s*\d{4}",
    ]

    stopped = False
    for line in lines:
        line_lower = line.lower().strip()

        # Check stop patterns
        for pat in stop_patterns:
            if re.search(pat, line_lower):
                stopped = True
                break
        if stopped:
            break

        # Check boilerplate patterns
        is_boilerplate = False
        for pat in boilerplate_patterns:
            if re.search(pat, line_lower):
                is_boilerplate = True
                break
        if is_boilerplate:
            continue

        cleaned.append(line)

    result = "\n".join(cleaned)
    result = re.sub(r"\n{3,}", "\n\n", result)
    result = result.strip()

    # Ensure trailing ---
    if not result.endswith("---"):
        result += "\n\n---\n"

    return result


def estimate_read_time(text):
    words = len(text.split())
    mins = max(1, round(words / 250))
    return f"{mins} min read"


def clean_title(raw_title):
    """Remove AU#NN: prefix for display title."""
    return re.sub(r"^AU#\d+:\s*", "", raw_title).strip()


def get_excerpt(md, max_len=200):
    """Extract a good excerpt from markdown content."""
    # Remove headers
    text = re.sub(r"^#+\s+.*$", "", md, flags=re.MULTILINE)
    # Remove markdown formatting
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"^[-*]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"\n{2,}", "\n", text)
    text = re.sub(r"\s+", " ", text).strip()

    # Take first meaningful chunk
    sentences = text.split(". ")
    excerpt = ""
    for s in sentences:
        if len(s.strip()) < 15:
            continue
        if excerpt:
            excerpt += ". " + s
        else:
            excerpt = s
        if len(excerpt) >= 100:
            break

    if len(excerpt) > max_len:
        excerpt = excerpt[:max_len].rsplit(" ", 1)[0] + "…"
    return excerpt.strip()


def get_category(title):
    """Assign category based on title content."""
    title_l = title.lower()
    if "market outlook" in title_l or "market outlook" in title_l:
        return "Market Outlook"
    if "report" in title_l or "q1" in title_l or "q2" in title_l or "q3" in title_l or "q4" in title_l or "year end" in title_l:
        return "Market Report"
    if "cmhc" in title_l and "budget" not in title_l:
        return "Policy Update"
    if "rate" in title_l and ("cut" in title_l or "drop" in title_l or "bond" in title_l):
        return "Interest Rates"
    if "deal" in title_l or "listing" in title_l or "closing" in title_l:
        return "Deal Update"
    if "insurance" in title_l:
        return "Investment Strategy"
    if "trade war" in title_l or "tariff" in title_l or "capital gains" in title_l or "budget" in title_l:
        return "Policy Update"
    if "election" in title_l or "pierre" in title_l or "1031" in title_l:
        return "Policy Update"
    if "value add" in title_l or "underwrite" in title_l or "buyers" in title_l:
        return "Investment Strategy"
    if "sentiment" in title_l or "pulse" in title_l or "economy" in title_l:
        return "Market Outlook"
    return "The Apartment Update"


def get_tags(title, content):
    """Generate relevant tags."""
    tags = ["apartment update", "newsletter"]
    title_l = (title + " " + content[:500]).lower()
    
    tag_map = {
        "cmhc": "CMHC",
        "bond yield": "bond yields",
        "rate cut": "rate cut",
        "cap rate": "cap rates",
        "gst": "GST",
        "trade war": "trade war",
        "tariff": "tariffs",
        "capital gains": "capital gains",
        "insurance": "insurance",
        "gta": "GTA",
        "toronto": "Toronto",
        "multifamily": "multifamily",
        "market report": "market report",
        "election": "election",
        "1031": "1031 exchange",
        "interest rate": "interest rates",
        "inflation": "inflation",
        "bank of canada": "Bank of Canada",
        "capreit": "CAPREIT",
        "rental": "rental market",
        "value add": "value add",
    }
    
    for keyword, tag in tag_map.items():
        if keyword in title_l and tag not in tags:
            tags.append(tag)
    
    return tags[:6]


def extract_newsletter_content(html):
    """Extract only the newsletter body from Mailchimp archive HTML."""
    # Find the main content area - Mailchimp archives wrap content in specific divs
    # Try to find the email body section
    
    # Strategy 1: Find content between known Mailchimp wrapper patterns
    # Look for the main table body content
    body_match = re.search(
        r'<body[^>]*>([\s\S]*?)</body>',
        html,
        re.IGNORECASE
    )
    if body_match:
        body = body_match.group(1)
    else:
        body = html
    
    # Remove the header/nav section (Mailchimp adds "View in Browser" bar)
    body = re.sub(
        r'<div[^>]*id=["\']webVersionBar["\'][^>]*>[\s\S]*?</div>',
        '', body, flags=re.IGNORECASE
    )
    
    # Remove footer sections
    footer_patterns = [
        r'<div[^>]*class=["\'][^"\']*footer[^"\']*["\'][^>]*>[\s\S]*?</div>',
        r'<div[^>]*id=["\'][^"\']*footer[^"\']*["\'][^>]*>[\s\S]*?</div>',
    ]
    for pat in footer_patterns:
        body = re.sub(pat, '', body, flags=re.IGNORECASE)
    
    return body


def main():
    # Load existing articles
    with open(ARTICLES_PATH) as f:
        articles = json.load(f)
    
    existing_ids = {a["id"] for a in articles}
    existing_dates = {a["date"] for a in articles}
    
    results = {
        "published": [],
        "skipped": [],
        "failed": [],
    }
    
    new_articles = []
    
    for date, raw_title, campaign_id in NEWSLETTERS:
        display_title = clean_title(raw_title)
        slug = slugify(display_title)
        archive_url = f"https://us20.campaign-archive.com/?u={USER_ID}&id={campaign_id}"
        
        print(f"\n{'='*60}")
        print(f"Processing: {date} — {display_title}")
        print(f"  URL: {archive_url}")
        
        # Check if already exists
        if slug in existing_ids:
            print(f"  ⏭  Skipping — already in articles.json (by slug)")
            results["skipped"].append({"date": date, "title": display_title, "reason": "slug exists"})
            continue
        
        # Check if date already exists (exact match means likely duplicate)
        if date in existing_dates:
            print(f"  ⏭  Skipping — date {date} already exists in articles.json")
            results["skipped"].append({"date": date, "title": display_title, "reason": f"date already exists"})
            continue
        
        # Fetch Mailchimp archive
        html = fetch_url(archive_url)
        if not html:
            print(f"  ❌ Failed to fetch archive")
            results["failed"].append({"date": date, "title": display_title, "reason": "fetch failed"})
            continue
        
        if len(html) < 500:
            print(f"  ❌ Archive returned too-short response ({len(html)} chars)")
            results["failed"].append({"date": date, "title": display_title, "reason": "empty response"})
            continue
        
        # Extract and convert content
        body = extract_newsletter_content(html)
        md = html_to_markdown(body)
        md = strip_boilerplate(md, display_title)
        
        # Validate content has substance
        word_count = len(md.split())
        if word_count < 50:
            print(f"  ❌ Content too short ({word_count} words)")
            results["failed"].append({"date": date, "title": display_title, "reason": f"too short ({word_count} words)"})
            continue
        
        print(f"  ✅ Extracted {word_count} words")
        
        # Add title as H1 if not present
        if not md.startswith("# "):
            md = f"# {display_title}\n\n{md}"
        
        # Write content file
        content_path = CONTENT_DIR / f"{slug}.md"
        if not content_path.exists():
            content_path.write_text(md, encoding="utf-8")
            print(f"  📝 Created: src/content/{slug}.md")
        
        # Build article entry
        excerpt = get_excerpt(md)
        category = get_category(display_title)
        tags = get_tags(display_title, md)
        
        article = {
            "id": slug,
            "title": display_title,
            "date": date,
            "excerpt": excerpt,
            "author": "Dayma Itamunoala",
            "readTime": estimate_read_time(md),
            "category": category,
            "tags": tags,
            "image": "/images/articles/newsletter-header.png",
            "featured": False,
            "mailchimpUrl": archive_url,
        }
        
        new_articles.append(article)
        existing_ids.add(slug)
        existing_dates.add(date)
        
        results["published"].append({"date": date, "title": display_title, "slug": slug, "category": category})
        
        # Rate limit
        time.sleep(0.5)
    
    # Merge new articles into existing, sorted newest-first
    all_articles = articles + new_articles
    all_articles.sort(key=lambda a: a["date"], reverse=True)
    
    # Write updated articles.json
    with open(ARTICLES_PATH, "w") as f:
        json.dump(all_articles, f, indent=2, ensure_ascii=False)
        f.write("\n")
    
    print(f"\n{'='*60}")
    print(f"RESULTS:")
    print(f"  Published: {len(results['published'])}")
    print(f"  Skipped:   {len(results['skipped'])}")
    print(f"  Failed:    {len(results['failed'])}")
    print(f"  Total articles.json: {len(all_articles)}")
    
    print(f"\n📋 PUBLISHED:")
    for r in results["published"]:
        print(f"  {r['date']} | {r['title'][:55]:55s} | {r['slug']}")
    
    if results["skipped"]:
        print(f"\n⏭  SKIPPED:")
        for r in results["skipped"]:
            print(f"  {r['date']} | {r['title'][:55]:55s} | {r['reason']}")
    
    if results["failed"]:
        print(f"\n❌ FAILED:")
        for r in results["failed"]:
            print(f"  {r['date']} | {r['title'][:55]:55s} | {r['reason']}")
    
    return results


if __name__ == "__main__":
    main()
