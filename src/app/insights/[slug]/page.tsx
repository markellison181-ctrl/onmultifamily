import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import articlesData from '@/data/articles.json'
import { readFileSync } from 'fs'
import { join } from 'path'

// Simple markdown-to-HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^# (.+$)/gm, '<h1 class="heading-lg text-colliers-blue-dark mb-8 mt-12 first:mt-0">$1</h1>')
    .replace(/^## (.+$)/gm, '<h2 class="heading-md text-colliers-blue-dark mb-6 mt-12">$1</h2>')
    .replace(/^### (.+$)/gm, '<h3 class="heading-sm text-colliers-blue-dark mb-4 mt-8">$1</h3>')
    
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-colliers-blue-dark">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    
    // Lists
    .replace(/^- (.+$)/gm, '<li class="mb-2">$1</li>')
    .replace(/(<li[\s\S]*<\/li>)/, '<ul class="list-disc list-inside mb-6 space-y-2 text-colliers-gray-80">$1</ul>')
    
    // Tables (basic support)
    .replace(/^\|(.+)\|$/gm, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
      return `<tr>${cells.map((cell: string) => `<td class="border border-gray-300 px-4 py-2">${cell}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>[\s\S]*<\/tr>)/, '<table class="w-full mb-6 border-collapse border border-gray-300">$1</table>')
    
    // Paragraphs
    .replace(/^(?!<[h|u|l|t])(.+$)/gm, '<p class="body-md text-colliers-gray-80 mb-6 leading-relaxed">$1</p>')
    
    // Clean up multiple newlines
    .replace(/\n\n+/g, '\n')
}

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.id,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesData.find(a => a.id === params.slug)
  
  if (!article) {
    notFound()
  }

  // Read markdown content
  let content = ''
  try {
    const filePath = join(process.cwd(), 'src', 'content', `${article.id}.md`)
    content = readFileSync(filePath, 'utf8')
  } catch (error) {
    content = `# ${article.title}\n\nContent coming soon...`
  }

  // Convert markdown to HTML
  const htmlContent = markdownToHtml(content)

  // Find related articles
  const relatedArticles = articlesData
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 2)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="section-light border-b border-gray-100">
        <div className="container-narrow">
          <Link 
            href="/insights" 
            className="inline-flex items-center gap-2 text-colliers-blue-dark hover:text-colliers-blue transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>

          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-block bg-colliers-pale-blue text-colliers-blue-dark text-sm font-medium px-4 py-2 rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="heading-lg text-colliers-blue-dark mb-8">
              {article.title}
            </h1>

            <div className="flex items-center gap-8 text-colliers-gray-80 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
              <div>
                <span>By {article.author}</span>
              </div>
            </div>

            <div className="gold-line mb-16"></div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-light">
        <div className="container-narrow">
          <div className="max-w-4xl prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>

          {/* Newsletter CTA */}
          <div className="border-t border-gray-200 pt-16 mt-16">
            <div className="bg-colliers-blue-dark text-white rounded-lg p-12 text-center">
              <h3 className="heading-sm text-white mb-4">
                Subscribe for Weekly Market Intelligence
              </h3>
              <p className="body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Get analysis like this delivered every week. Join 14,000+ multifamily professionals staying ahead of Ontario market trends.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-6 py-4 rounded-none bg-white text-colliers-blue-dark focus:outline-none"
                />
                <button 
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-20">
              <h3 className="heading-sm text-colliers-blue-dark mb-12 text-center">
                Related Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {relatedArticles.map((relatedArticle) => (
                  <article key={relatedArticle.id} className="group">
                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 text-colliers-blue-dark text-xs font-medium px-3 py-1 rounded-full">
                        {relatedArticle.category}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-serif text-colliers-blue-dark mb-4 leading-tight group-hover:text-colliers-blue transition-colors duration-300">
                      {relatedArticle.title}
                    </h4>
                    
                    <p className="text-colliers-gray-80 mb-6 leading-relaxed">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <Link 
                      href={`/insights/${relatedArticle.id}`}
                      className="inline-flex items-center gap-2 text-colliers-blue-dark font-medium hover:text-colliers-blue transition-colors duration-300 group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}