'use client'

import React, { useState, useMemo } from 'react'

/*
  CMHC Insured Mortgage Calculator
  
  Methodology:
  1. Calculate NOI from inputs (revenue - expenses)
  2. Size debt based on DSCR constraint at qualification rate
  3. Check against LTV constraint at appraised value
  4. Take the lesser (binding constraint)
  5. Add CMHC insurance premium
  6. Show MLI Select scenarios (lower DSCR thresholds = more debt)
  
  CMHC underwriting uses:
  - Qualification rate (stress test): typically GoC + spread + buffer OR contract rate + 200bps
  - DSCR minimum: 1.10x (standard), can go to 1.00x with MLI Select credits
  - LTV maximum: 85% (standard), up to 95% with MLI Select
  - Amortization: typically 35-40 years for insured, up to 50 with MLI Select
  - Insurance premium: 1.50% to 4.50% depending on LTV and amortization
*/

interface Inputs {
  // Revenue
  grossRentalIncome: number
  otherIncome: number
  vacancyRate: number
  // Expenses
  operatingExpenses: number
  propertyTaxes: number
  // Valuation
  purchasePrice: number
  // Loan Terms
  interestRate: number
  qualificationRate: number
  amortizationYears: number
  // MLI Select
  mliSelect: boolean
  mliCredits: number // 0-100 points
}

const defaultInputs: Inputs = {
  grossRentalIncome: 500000,
  otherIncome: 25000,
  vacancyRate: 3.0,
  operatingExpenses: 180000,
  propertyTaxes: 45000,
  purchasePrice: 5000000,
  interestRate: 3.90,
  qualificationRate: 5.25,
  amortizationYears: 35,
  mliSelect: false,
  mliCredits: 0,
}

function getDSCRMin(mliSelect: boolean, credits: number): number {
  if (!mliSelect) return 1.10
  if (credits >= 100) return 1.00
  if (credits >= 75) return 1.02
  if (credits >= 50) return 1.05
  return 1.10
}

function getLTVMax(mliSelect: boolean, credits: number): number {
  if (!mliSelect) return 0.85
  if (credits >= 100) return 0.95
  if (credits >= 75) return 0.92
  if (credits >= 50) return 0.90
  return 0.85
}

function getAmortMax(mliSelect: boolean, credits: number): number {
  if (!mliSelect) return 40
  if (credits >= 50) return 50
  return 40
}

function getInsurancePremium(ltv: number, amort: number): number {
  // Simplified CMHC premium schedule
  if (amort <= 25) {
    if (ltv <= 0.65) return 0.0050
    if (ltv <= 0.75) return 0.0065
    if (ltv <= 0.80) return 0.0120
    if (ltv <= 0.85) return 0.0175
    if (ltv <= 0.90) return 0.0275
    return 0.0400
  }
  // 25-40 year amort
  if (ltv <= 0.65) return 0.0100
  if (ltv <= 0.75) return 0.0150
  if (ltv <= 0.80) return 0.0195
  if (ltv <= 0.85) return 0.0250
  if (ltv <= 0.90) return 0.0350
  return 0.0450
}

function calcMortgagePayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12
  const n = years * 12
  if (monthlyRate === 0) return principal / n
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(val)
}

function formatPercent(val: number, decimals = 2): string {
  return `${val.toFixed(decimals)}%`
}

function InputField({ label, value, onChange, prefix, suffix, step, min, max, hint }: {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
  step?: number
  min?: number
  max?: number
  hint?: string
}) {
  return (
    <div>
      <label className="text-[12px] tracking-wide-custom uppercase text-navy/40 block mb-2">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30 text-sm">{prefix}</span>}
        <input
          type="number"
          value={value || ''}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          step={step || 1}
          min={min}
          max={max}
          className={`w-full border border-soft-gray bg-white text-navy py-3 text-[15px] focus:border-navy/30 focus:outline-none transition-colors ${prefix ? 'pl-8 pr-4' : suffix ? 'pl-4 pr-10' : 'px-4'}`}
        />
        {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 text-sm">{suffix}</span>}
      </div>
      {hint && <p className="text-navy/25 text-[12px] mt-1">{hint}</p>}
    </div>
  )
}

export default function CMHCCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)

  const update = (field: keyof Inputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const results = useMemo(() => {
    const { grossRentalIncome, otherIncome, vacancyRate, operatingExpenses, propertyTaxes, purchasePrice, interestRate, qualificationRate, amortizationYears, mliSelect, mliCredits } = inputs

    // Income
    const egi = (grossRentalIncome + otherIncome) * (1 - vacancyRate / 100)
    const totalExpenses = operatingExpenses + propertyTaxes
    const noi = egi - totalExpenses
    const expenseRatio = egi > 0 ? (totalExpenses / egi) * 100 : 0
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0

    // Constraints
    const dscrMin = getDSCRMin(mliSelect, mliCredits)
    const ltvMax = getLTVMax(mliSelect, mliCredits)
    const amortMax = getAmortMax(mliSelect, mliCredits)
    const effectiveAmort = Math.min(amortizationYears, amortMax)

    // DSCR-constrained debt
    // NOI / DSCR = max annual debt service
    const maxAnnualDS = noi / dscrMin
    // Back into max mortgage from annual payment at qualification rate
    const monthlyQualRate = qualificationRate / 100 / 12
    const nPayments = effectiveAmort * 12
    let dscrMaxLoan = 0
    if (monthlyQualRate > 0 && maxAnnualDS > 0) {
      const maxMonthlyDS = maxAnnualDS / 12
      dscrMaxLoan = maxMonthlyDS * (Math.pow(1 + monthlyQualRate, nPayments) - 1) / (monthlyQualRate * Math.pow(1 + monthlyQualRate, nPayments))
    }

    // LTV-constrained debt
    const ltvMaxLoan = purchasePrice * ltvMax

    // Binding constraint
    const maxLoan = Math.min(dscrMaxLoan, ltvMaxLoan)
    const bindingConstraint = dscrMaxLoan < ltvMaxLoan ? 'DSCR' : 'LTV'
    const actualLTV = purchasePrice > 0 ? maxLoan / purchasePrice : 0

    // Insurance premium
    const premiumRate = getInsurancePremium(actualLTV, effectiveAmort)
    const insurancePremium = maxLoan * premiumRate
    const totalInsuredLoan = maxLoan + insurancePremium

    // Actual debt service at contract rate
    const annualDS = calcMortgagePayment(totalInsuredLoan, interestRate, effectiveAmort) * 12
    const actualDSCR = annualDS > 0 ? noi / annualDS : 0

    // Equity required
    const equityRequired = purchasePrice - maxLoan

    return {
      egi, totalExpenses, noi, expenseRatio, capRate,
      dscrMin, ltvMax, amortMax, effectiveAmort,
      dscrMaxLoan, ltvMaxLoan, maxLoan, bindingConstraint, actualLTV,
      premiumRate, insurancePremium, totalInsuredLoan,
      annualDS, actualDSCR, equityRequired,
    }
  }, [inputs])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-deep pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden noise">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <a href="/resources/" className="text-[11px] tracking-[0.2em] uppercase text-white/25 hover:text-white/40 transition-colors mb-6 block">
            ← Resources
          </a>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gold-light font-medium">Underwriting Tool</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[0.95] mb-6">
            CMHC Debt<br /><span className="text-gradient-gold">Calculator</span>
          </h1>
          <p className="text-white/40 text-[16px] max-w-2xl leading-relaxed">
            Size your CMHC-insured mortgage in seconds. Input your property financials and get 
            instant debt sizing with DSCR, LTV, and MLI Select credit scenarios.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            
            {/* Inputs — 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Revenue */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Revenue</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="Gross Rental Income (Annual)"
                    value={inputs.grossRentalIncome}
                    onChange={v => update('grossRentalIncome', v)}
                    prefix="$"
                    step={10000}
                    hint="Total potential rent at market"
                  />
                  <InputField
                    label="Other Income (Annual)"
                    value={inputs.otherIncome}
                    onChange={v => update('otherIncome', v)}
                    prefix="$"
                    step={1000}
                    hint="Parking, laundry, storage, etc."
                  />
                  <InputField
                    label="Vacancy & Bad Debt"
                    value={inputs.vacancyRate}
                    onChange={v => update('vacancyRate', v)}
                    suffix="%"
                    step={0.5}
                    min={0}
                    max={20}
                    hint="CMHC typically underwrites 3-5%"
                  />
                </div>
              </div>

              {/* Expenses */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Operating Expenses</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="Operating Expenses (Annual)"
                    value={inputs.operatingExpenses}
                    onChange={v => update('operatingExpenses', v)}
                    prefix="$"
                    step={5000}
                    hint="Utilities, maintenance, insurance, mgmt"
                  />
                  <InputField
                    label="Property Taxes (Annual)"
                    value={inputs.propertyTaxes}
                    onChange={v => update('propertyTaxes', v)}
                    prefix="$"
                    step={1000}
                  />
                </div>
              </div>

              {/* Valuation */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Valuation</h3>
                <InputField
                  label="Purchase Price / Appraised Value"
                  value={inputs.purchasePrice}
                  onChange={v => update('purchasePrice', v)}
                  prefix="$"
                  step={50000}
                />
              </div>

              {/* Loan Terms */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Loan Terms</h3>
                <div className="grid sm:grid-cols-3 gap-5">
                  <InputField
                    label="Contract Rate"
                    value={inputs.interestRate}
                    onChange={v => update('interestRate', v)}
                    suffix="%"
                    step={0.05}
                    min={0}
                    hint="Your actual mortgage rate"
                  />
                  <InputField
                    label="Qualification Rate"
                    value={inputs.qualificationRate}
                    onChange={v => update('qualificationRate', v)}
                    suffix="%"
                    step={0.05}
                    min={0}
                    hint="CMHC stress test rate"
                  />
                  <InputField
                    label="Amortization (Years)"
                    value={inputs.amortizationYears}
                    onChange={v => update('amortizationYears', v)}
                    step={5}
                    min={15}
                    max={50}
                    hint="Standard: 35yr, MLI Select: up to 50yr"
                  />
                </div>
              </div>

              {/* MLI Select */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl text-navy">MLI Select</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <span className="text-[13px] text-navy/40">{inputs.mliSelect ? 'Enabled' : 'Disabled'}</span>
                    <button
                      onClick={() => update('mliSelect', !inputs.mliSelect)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${inputs.mliSelect ? 'bg-navy' : 'bg-soft-gray'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${inputs.mliSelect ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </label>
                </div>
                {inputs.mliSelect && (
                  <div>
                    <InputField
                      label="MLI Select Credits (points)"
                      value={inputs.mliCredits}
                      onChange={v => update('mliCredits', Math.min(100, Math.max(0, v)))}
                      step={5}
                      min={0}
                      max={100}
                      hint="50pts: 90% LTV, 50yr amort | 75pts: 92% LTV | 100pts: 95% LTV, 1.00x DSCR"
                    />
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[50, 75, 100].map(pts => (
                        <button
                          key={pts}
                          onClick={() => update('mliCredits', pts)}
                          className={`py-2 text-[12px] tracking-wide-custom uppercase border transition-colors ${
                            inputs.mliCredits === pts 
                              ? 'bg-navy text-white border-navy' 
                              : 'bg-transparent text-navy/40 border-soft-gray hover:border-navy/20'
                          }`}
                        >
                          {pts} Points
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-navy/25 text-[13px] mt-4 leading-relaxed">
                  CMHC&apos;s MLI Select program provides enhanced loan terms for projects 
                  meeting affordability, accessibility, and energy efficiency criteria.
                </p>
              </div>
            </div>

            {/* Results — 2 columns (sticky) */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 space-y-6">
                
                {/* Primary Result */}
                <div className="bg-navy p-6 sm:p-8">
                  <p className="text-[11px] tracking-wide-custom uppercase text-gold mb-3">Maximum Insured Loan</p>
                  <p className="font-serif text-4xl sm:text-5xl text-white mb-2">
                    {formatCurrency(results.maxLoan)}
                  </p>
                  <p className="text-white/30 text-[13px] mb-6">
                    Constrained by {results.bindingConstraint} · {formatPercent(results.actualLTV * 100, 1)} LTV
                  </p>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">CMHC Premium ({formatPercent(results.premiumRate * 100)})</span>
                      <span className="text-white">{formatCurrency(results.insurancePremium)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">Total Insured Loan</span>
                      <span className="text-white font-medium">{formatCurrency(results.totalInsuredLoan)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">Annual Debt Service</span>
                      <span className="text-white">{formatCurrency(results.annualDS)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">Monthly Payment</span>
                      <span className="text-white">{formatCurrency(results.annualDS / 12)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-gold/60">Equity Required</span>
                      <span className="text-gold font-serif text-xl">{formatCurrency(results.equityRequired)}</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="bg-white border border-soft-gray p-6 sm:p-8">
                  <h4 className="text-[12px] tracking-wide-custom uppercase text-navy/30 mb-5">Property Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">Effective Gross Income</span>
                      <span className="text-navy font-medium">{formatCurrency(results.egi)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">Total Expenses</span>
                      <span className="text-navy font-medium">{formatCurrency(results.totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] pt-3 border-t border-soft-gray">
                      <span className="text-navy/50">Net Operating Income</span>
                      <span className="text-navy font-serif text-lg">{formatCurrency(results.noi)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">Expense Ratio</span>
                      <span className="text-navy">{formatPercent(results.expenseRatio)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">Cap Rate</span>
                      <span className="text-navy">{formatPercent(results.capRate)}</span>
                    </div>
                  </div>
                </div>

                {/* Sizing Constraints */}
                <div className="bg-white border border-soft-gray p-6 sm:p-8">
                  <h4 className="text-[12px] tracking-wide-custom uppercase text-navy/30 mb-5">Sizing Constraints</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">DSCR-Sized Loan</span>
                      <span className={`font-medium ${results.bindingConstraint === 'DSCR' ? 'text-navy' : 'text-navy/40'}`}>
                        {formatCurrency(results.dscrMaxLoan)}
                        {results.bindingConstraint === 'DSCR' && <span className="text-gold text-[11px] ml-2">BINDING</span>}
                      </span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">LTV-Sized Loan</span>
                      <span className={`font-medium ${results.bindingConstraint === 'LTV' ? 'text-navy' : 'text-navy/40'}`}>
                        {formatCurrency(results.ltvMaxLoan)}
                        {results.bindingConstraint === 'LTV' && <span className="text-gold text-[11px] ml-2">BINDING</span>}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-soft-gray space-y-3">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Min DSCR</span>
                        <span className="text-navy">{results.dscrMin.toFixed(2)}x</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Max LTV</span>
                        <span className="text-navy">{formatPercent(results.ltvMax * 100, 0)}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Actual DSCR (at contract rate)</span>
                        <span className="text-navy">{results.actualDSCR.toFixed(2)}x</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Effective Amortization</span>
                        <span className="text-navy">{results.effectiveAmort} years</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-warm-gray border border-soft-gray p-6 sm:p-8 text-center">
                  <p className="font-serif text-lg text-navy mb-2">Want a detailed underwriting?</p>
                  <p className="text-navy/40 text-[14px] mb-5">
                    This calculator provides estimates. Our team can run a full 
                    lender-ready underwriting for your specific property.
                  </p>
                  <a
                    href="#contact"
                    className="inline-block bg-navy text-white text-[12px] tracking-wide-custom uppercase font-medium px-8 py-3.5 hover:bg-navy-light transition-colors"
                  >
                    Request Underwriting
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="mt-16 sm:mt-20 max-w-3xl">
            <h3 className="font-serif text-2xl text-navy mb-4">Methodology</h3>
            <div className="text-navy/40 text-[14px] leading-relaxed space-y-3">
              <p>
                This calculator sizes CMHC-insured debt using standard underwriting methodology: 
                the maximum loan is the lesser of DSCR-constrained and LTV-constrained amounts.
              </p>
              <p>
                <strong className="text-navy/60">DSCR sizing</strong> calculates the maximum loan whose 
                annual debt service (at the qualification/stress-test rate) equals NOI divided by the 
                minimum DSCR requirement.
              </p>
              <p>
                <strong className="text-navy/60">LTV sizing</strong> applies the maximum loan-to-value 
                ratio against the purchase price or appraised value.
              </p>
              <p>
                <strong className="text-navy/60">MLI Select</strong> credits unlock enhanced terms: 
                lower DSCR minimums (down to 1.00x), higher LTV (up to 95%), and longer amortization 
                (up to 50 years) for projects meeting CMHC&apos;s affordability, accessibility, and 
                climate compatibility criteria.
              </p>
              <p>
                Insurance premiums are estimated based on CMHC&apos;s published schedule and added to 
                the base loan amount. Actual premiums may vary. This tool is for educational purposes — 
                contact our team for lender-ready underwriting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
