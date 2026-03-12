#!/usr/bin/env node
/**
 * Updates rates.json from command-line args (called by the cron agent after browser scraping).
 * Also rebuilds the BondYieldTracker and CMHCCalculator components to use the data file,
 * then deploys.
 * 
 * Usage: node scripts/update-rates.js '{"goc5y":2.98,"goc10y":3.44,"cmb5y":3.22,"cmb10y":3.77,"bankRate":2.25,"usTreasury5y":3.78,"usTreasury10y":4.20}'
 * Add --deploy to build and deploy to Vercel after updating.
 */

const fs = require('fs')
const path = require('path')

const RATES_FILE = path.join(__dirname, '..', 'src', 'data', 'rates.json')

function main() {
  const ratesArg = process.argv[2]
  if (!ratesArg) {
    console.error('Usage: node update-rates.js \'{"goc5y":...}\'')
    process.exit(1)
  }

  const newRates = JSON.parse(ratesArg)
  const requiredKeys = ['goc5y', 'goc10y', 'cmb5y', 'cmb10y', 'bankRate']
  for (const k of requiredKeys) {
    if (typeof newRates[k] !== 'number') {
      console.error(`Missing or invalid rate: ${k}`)
      process.exit(1)
    }
  }

  // Load existing
  let existing = { rates: {}, history: {} }
  try {
    existing = JSON.parse(fs.readFileSync(RATES_FILE, 'utf8'))
  } catch (e) {
    console.log('No existing rates file.')
  }

  // Roll current into history
  const newHistory = {}
  for (const key of Object.keys(newRates)) {
    const oldHistory = existing.history?.[key] || {}
    newHistory[key] = {
      prevClose: existing.rates?.[key] ?? newRates[key],
      weekAgo: oldHistory.weekAgo ?? oldHistory.prevClose ?? newRates[key],
      monthAgo: oldHistory.monthAgo ?? newRates[key],
      yearAgo: oldHistory.yearAgo ?? newRates[key],
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const updated = {
    lastUpdated: today,
    source: 'Peakhill Capital / theFinancials.com',
    rates: newRates,
    history: newHistory,
  }

  fs.writeFileSync(RATES_FILE, JSON.stringify(updated, null, 2) + '\n')
  console.log(`Rates saved: ${today}`)
  console.log(JSON.stringify(updated.rates))

  if (process.argv.includes('--deploy')) {
    const { execSync } = require('child_process')
    const projectDir = path.join(__dirname, '..')
    console.log('Building...')
    execSync('npx next build', { cwd: projectDir, stdio: 'inherit' })
    console.log('Deploying...')
    execSync('npx vercel --prod --yes', { cwd: projectDir, stdio: 'inherit' })
    console.log('Done.')
  }
}

main()
