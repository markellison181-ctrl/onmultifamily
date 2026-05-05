import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import articlesData from '@/data/articles.json'
import { ArticleSchema } from '@/components/StructuredData'
import { readFileSync } from 'fs'
import { join } from 'path'

function markdownToHtml(md: string): string {
  return md
    .replace(/^# (.+$)/gm, '<h1 class="font-serif text-3xl md:text-4xl text-navy mb-6 mt-14 first:mt-0">$1</h1>')
    .replace(/^## (.+$)/gm, '<h2 class="font-serif text-2xl md:text-3xl text-navy mb-5 mt-12">$1</h2>')
    .replace(/^### (.+$)/gm, '<h3 class="font-serif text-xl text-navy mb-4 mt-10">$1</h3>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-10"><img src="$2" alt="$1" class="w-full" /><figcaption class="text-center text-navy/30 text-[13px] mt-3">$1</figcaption></figure>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+$)/gm, '<li class="text-navy/60 leading-relaxed mb-1.5 ml-5 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+$)/gm, '<li class="text-navy/60 leading-relaxed mb-1.5 ml-5 list-decimal"><strong class="text-navy">$2</strong></li>')
    .replace(/^---$/gm, '<hr class="border-t border-soft-gray my-10" />')
    .replace(/^> (.+$)/gm, '<blockquote class="border-l-2 border-gold pl-6 my-8 text-navy/50 italic text-lg leading-relaxed">$1</blockquote>')
    .replace(/^(?!<[hluoitfb])(?!$)(.+)$/gm, '<p class="text-navy/60 text-[17px] leading-[1.8] mb-5">$1</p>')
    .replace(/\n{2,}/g, '\n')
}

export async function generateStaticParams() {
  return articlesData.map(a => ({ slug: a.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articlesData.find(a => a.id === params.slug)
  if (!article) return { title: 'Article Not Found' }
  
  return {
    title: `${article.title} | OnMultifamily`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: ['Dayma Itamunoala'],
      images: article.image ? [{ url: article.image, alt: article.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesData.find(a => a.id === params.slug)
  if (!article) notFound()

  let content = ''
  try {
    content = readFileSync(join(process.cwd(), 'src', 'content', `${article.id}.md`), 'utf8')
  } catch {
    content = `# ${article.title}\n\nContent coming soon.`
  }

  const html = markdownToHtml(content)
  const related = articlesData.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <main>
      <ArticleSchema article={article} />
      <Header />

      {/* Article Header */}
      <section className="bg-navy pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Link
            href="/insights/"
            className="text-[12px] tracking-wide-custom uppercase text-white/30 hover:text-white/60 transition-colors mb-10 inline-block"
          >
            ← Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] tracking-wide-custom uppercase font-semibold text-gold">
              {article.category}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[12px] text-white/40">{article.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-8">
            {article.title}
          </h1>

          <div className="flex items-center gap-4">
            <Image
              src="/images/team/dayma.png"
              alt="Dayma Itamunoala"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-white text-sm font-medium">{article.author}</div>
              <div className="text-white/40 text-[12px]">
                {new Date(article.date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {article.image && (
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-2">
            <div className="relative aspect-[16/9] overflow-hidden shadow-lg">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Body */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <p className="text-navy/50 text-lg mb-2">
            Get analysis like this delivered every week.
          </p>
          <p className="text-navy/30 text-sm mb-8">
            Join 14,000+ multifamily professionals staying ahead of Ontario market trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-white border border-soft-gray px-5 py-3.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy transition-colors"
            />
            <button className="bg-navy text-white text-[12px] tracking-wide-custom uppercase font-medium px-8 py-3.5 hover:bg-navy-light transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 md:py-28 bg-white border-t border-soft-gray">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-2xl text-navy mb-10">More Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map(a => (
              <Link key={a.id} href={`/insights/${a.id}/`} className="group block">
                {a.image && (
                  <div className="relative aspect-[16/9] overflow-hidden mb-4">
                    <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                  </div>
                )}
                <span className="text-[11px] tracking-wide-custom uppercase font-semibold text-blue block mb-2">
                  {a.category}
                </span>
                <h3 className="font-serif text-lg text-navy leading-snug mb-2 group-hover:text-blue transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="text-navy/40 text-[13px]">{a.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
