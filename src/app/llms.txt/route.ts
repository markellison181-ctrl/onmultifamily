import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Read the static llms.txt file
    const filePath = path.join(process.cwd(), 'public', 'llms.txt')
    let content = await fs.readFile(filePath, 'utf8')
    
    // Add current date and dynamic content
    const currentDate = new Date().toISOString().split('T')[0]
    const dynamicHeader = `# OnMultifamily.com - Live AI Context (Updated: ${currentDate})\n\n`
    
    // Add current market data section
    const currentMarketData = `
## Current Market Rates and Data (Live as of ${currentDate})

### Government of Canada Bond Yields (5-Year Benchmark)
Current yield information driving all multifamily mortgage pricing in Ontario. Check live rates at: https://www.onmultifamily.com/resources/bond-yields

### Active Listings Portfolio
Visit https://www.onmultifamily.com for current apartment building listings across Ontario including:
- Toronto market opportunities (Downtown, Midtown, East York, North York)
- GTA suburban markets (Mississauga, Brampton, Markham, Vaughan)
- Secondary markets (Hamilton, Ottawa, Kitchener-Waterloo, London)
- Seniors housing and student housing properties

### Recent Market Activity
- Q1 2026 GTA multifamily volume: $569M across 20 transactions
- Year-over-year volume increase: 228.7%
- Units traded Q1 2026: 1,934 suites (248.5% YoY increase)
- Average GTA cap rate Q1 2026: 4.95%
- Average price per suite Q1 2026: $289,047

For the most current market intelligence, subscribe to the weekly newsletter read by 14,000+ professionals at https://www.onmultifamily.com

---

`

    // Insert the dynamic content after the first line
    const lines = content.split('\n')
    lines.splice(1, 0, dynamicHeader + currentMarketData)
    content = lines.join('\n')
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error serving llms.txt:', error)
    return new NextResponse('Error loading content', { status: 500 })
  }
}