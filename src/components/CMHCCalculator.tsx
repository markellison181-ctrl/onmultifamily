'use client'

import React, { useState, useMemo } from 'react'
import ratesData from '@/data/rates.json'

/*
  CMHC Insured Multifamily Mortgage Calculator
  
  Proper multifamily underwriting methodology:
  1. Build NOI from per-unit rent + property-specific expenses
  2. System-imposed constants for: vacancy (3%), bad debt (1.5%), management (4.25% EGR), R&M varies by construction type
  3. User inputs property-specific: taxes, utilities, insurance
  4. Contract rate = CMB 5-year yield + lender spread (no "qualification rate" for multifamily)
  5. Size debt: lesser of DSCR-constrained and LTV-constrained
  6. Add CMHC insurance premium (updated schedule effective July 14, 2025 - Advice 264)
  7. MLI Select scenarios adjust DSCR, LTV, amortization, and premium discounts
*/

type ConstructionType = 'wood' | 'concrete'
type LoanPurpose = 'purchase' | 'refinance'

// ─── CMHC System Constants ──────────────────────────────────────────
const CMHC_CONSTANTS = {
  vacancyRate: 3.0,
  badDebtRate: 1.5,
  managementRate: 4.25,
  maintenancePerUnit: { wood: 975, concrete: 750 } as Record<ConstructionType, number>,
  defaultCMBYield: ratesData.rates.cmb5y,
  defaultSpread: 0.60,
}

interface Inputs {
  constructionType: ConstructionType
  loanPurpose: LoanPurpose
  units: number
  avgMonthlyRentPerUnit: number
  otherIncomePerUnit: number
  propertyTaxes: number
  utilities: number
  insurance: number
  purchasePrice: number
  appraisedValue: number
  existingMortgage: number
  cmbYield: number
  lenderSpread: number
  amortizationYears: number
  mliSelect: boolean
  mliCredits: number
  egiSurcharge: boolean
}

const defaultInputs: Inputs = {
  constructionType: 'concrete',
  loanPurpose: 'purchase',
  units: 32,
  avgMonthlyRentPerUnit: 1300,
  otherIncomePerUnit: 75,
  propertyTaxes: 45000,
  utilities: 36000,
  insurance: 18000,
  purchasePrice: 5000000,
  appraisedValue: 5000000,
  existingMortgage: 0,
  cmbYield: CMHC_CONSTANTS.defaultCMBYield,
  lenderSpread: CMHC_CONSTANTS.defaultSpread,
  amortizationYears: 35,
  mliSelect: false,
  mliCredits: 0,
  egiSurcharge: false,
}

// ─── CMHC Underwriting Functions ────────────────────────────────────

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

// Updated CMHC Insurance Premium Schedule - Advice 264, effective July 14, 2025
// Standard Rental Housing (purchase & refinance)
function getInsurancePremiumStandard(ltv: number): number {
  if (ltv <= 0.65) return 0.0260
  if (ltv <= 0.70) return 0.0285
  if (ltv <= 0.75) return 0.0335
  if (ltv <= 0.80) return 0.0435
  if (ltv <= 0.85) return 0.0535
  if (ltv <= 0.90) return 0.0590
  return 0.0615
}

// MLI Select discount on premiums
function getMliPremiumDiscount(mliSelect: boolean, credits: number): number {
  if (!mliSelect) return 0
  if (credits >= 100) return 0.30
  if (credits >= 70) return 0.20
  if (credits >= 50) return 0.10
  return 0
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

// ─── Input Components ───────────────────────────────────────────────

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

function ConstantRow({ label, value, tooltip }: { label: string; value: string; tooltip?: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-[13px] text-navy/50">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-navy font-medium">{value}</span>
        {tooltip && (
          <span className="group relative">
            <span className="text-navy/20 text-[11px] cursor-help border border-navy/15 rounded-full w-4 h-4 flex items-center justify-center">?</span>
            <span className="absolute right-0 bottom-6 w-52 bg-navy text-white text-[11px] p-3 leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              {tooltip}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

function ToggleGroup({ label, options, value, onChange }: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-[12px] tracking-wide-custom uppercase text-navy/40 block mb-2">{label}</label>
      <div className="flex">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-3 text-[13px] tracking-wide-custom uppercase border transition-colors ${
              value === opt.value
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-navy/40 border-soft-gray hover:border-navy/20'
            } ${i === 0 ? '' : 'border-l-0'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────

export default function CMHCCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)
  const update = (field: keyof Inputs, value: number | boolean | string) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const maintenancePerUnit = CMHC_CONSTANTS.maintenancePerUnit[inputs.constructionType]

  const results = useMemo(() => {
    const {
      constructionType, loanPurpose,
      units, avgMonthlyRentPerUnit, otherIncomePerUnit,
      propertyTaxes, utilities, insurance,
      purchasePrice, appraisedValue, existingMortgage,
      cmbYield, lenderSpread,
      amortizationYears, mliSelect, mliCredits, egiSurcharge,
    } = inputs

    const rmPerUnit = CMHC_CONSTANTS.maintenancePerUnit[constructionType]
    const contractRate = cmbYield + lenderSpread

    // Revenue
    const grossRentalIncome = units * avgMonthlyRentPerUnit * 12
    const otherIncome = units * otherIncomePerUnit * 12
    const grossPotentialIncome = grossRentalIncome + otherIncome
    const vacancyLoss = grossPotentialIncome * (CMHC_CONSTANTS.vacancyRate / 100)
    const badDebtLoss = grossPotentialIncome * (CMHC_CONSTANTS.badDebtRate / 100)
    const egi = grossPotentialIncome - vacancyLoss - badDebtLoss

    // Expenses
    const managementFee = egi * (CMHC_CONSTANTS.managementRate / 100)
    const maintenance = units * rmPerUnit
    const totalExpenses = propertyTaxes + utilities + insurance + managementFee + maintenance
    const noi = egi - totalExpenses
    const expenseRatio = egi > 0 ? (totalExpenses / egi) * 100 : 0

    // Lending value - purchase uses lesser of price vs appraisal; refinance uses appraisal only
    let lendingValue: number
    if (loanPurpose === 'purchase') {
      lendingValue = appraisedValue > 0 ? Math.min(purchasePrice, appraisedValue) : purchasePrice
    } else {
      lendingValue = appraisedValue
    }

    const capRate = lendingValue > 0 ? (noi / lendingValue) * 100 : 0
    const pricePerUnit = lendingValue > 0 ? lendingValue / units : 0

    // Constraints
    const dscrMin = getDSCRMin(mliSelect, mliCredits)
    const ltvMax = getLTVMax(mliSelect, mliCredits)
    const amortMax = getAmortMax(mliSelect, mliCredits)
    const effectiveAmort = Math.min(amortizationYears, amortMax)

    // DSCR-constrained debt
    const maxAnnualDS = noi / dscrMin
    const monthlyRate = contractRate / 100 / 12
    const nPayments = effectiveAmort * 12
    let dscrMaxLoan = 0
    if (monthlyRate > 0 && maxAnnualDS > 0) {
      const maxMonthlyDS = maxAnnualDS / 12
      dscrMaxLoan = maxMonthlyDS * (Math.pow(1 + monthlyRate, nPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, nPayments))
    }

    // LTV-constrained debt
    const ltvMaxLoan = lendingValue * ltvMax

    // Binding constraint
    const maxLoan = Math.max(0, Math.min(dscrMaxLoan, ltvMaxLoan))
    const bindingConstraint = dscrMaxLoan < ltvMaxLoan ? 'DSCR' : 'LTV'
    const actualLTV = lendingValue > 0 ? maxLoan / lendingValue : 0

    // Insurance premium (Advice 264 schedule)
    const basePremiumRate = getInsurancePremiumStandard(actualLTV)
    const mliDiscount = getMliPremiumDiscount(mliSelect, mliCredits)
    const premiumRate = basePremiumRate * (1 - mliDiscount)
    const insurancePremium = maxLoan * premiumRate

    // EGI surcharge: 0.25% of net loan if toggled
    const egiSurchargeAmount = egiSurcharge ? maxLoan * 0.0025 : 0

    const totalInsuredLoan = maxLoan + insurancePremium + egiSurchargeAmount

    // Actual debt service at contract rate
    const annualDS = calcMortgagePayment(totalInsuredLoan, contractRate, effectiveAmort) * 12
    const actualDSCR = annualDS > 0 ? noi / annualDS : 0

    // Equity / extraction
    const equityRequired = loanPurpose === 'purchase' ? purchasePrice - maxLoan : 0
    const equityExtraction = loanPurpose === 'refinance' ? Math.max(0, maxLoan - existingMortgage) : 0

    // Cash-on-cash return
    const cashFlow = noi - annualDS
    const equityBase = loanPurpose === 'purchase' ? equityRequired : (existingMortgage > 0 ? lendingValue - existingMortgage : lendingValue - maxLoan)
    const cashOnCash = equityBase > 0 ? (cashFlow / equityBase) * 100 : 0

    return {
      contractRate, lendingValue,
      grossRentalIncome, otherIncome, grossPotentialIncome,
      vacancyLoss, badDebtLoss, egi,
      managementFee, maintenance, rmPerUnit, totalExpenses, noi,
      expenseRatio, capRate, pricePerUnit,
      dscrMin, ltvMax, amortMax, effectiveAmort,
      dscrMaxLoan, ltvMaxLoan, maxLoan, bindingConstraint, actualLTV,
      basePremiumRate, mliDiscount, premiumRate, insurancePremium,
      egiSurchargeAmount, totalInsuredLoan,
      annualDS, actualDSCR,
      equityRequired, equityExtraction,
      cashFlow, cashOnCash,
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
            CMHC Debt<br /><span className="text-gradient-gold">Underwriter</span>
          </h1>
          <p className="text-white/40 text-[16px] max-w-2xl leading-relaxed">
            Size CMHC-insured multifamily debt using institutional underwriting methodology. 
            Contract rate priced off 5-year CMB yield + lender spread. Vacancy, bad debt, 
            management, and Repairs &amp; Maintenance reserves imposed per CMHC standards.
            Premium schedule updated per CMHC Advice 264 (July 14, 2025).
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid xl:grid-cols-5 gap-8 xl:gap-12">
            
            {/* Inputs: 3 columns */}
            <div className="xl:col-span-3 space-y-8">

              {/* Construction Type & Loan Purpose */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Deal Parameters</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <ToggleGroup
                    label="Construction Type"
                    options={[
                      { value: 'concrete', label: 'Concrete' },
                      { value: 'wood', label: 'Wood Frame' },
                    ]}
                    value={inputs.constructionType}
                    onChange={v => update('constructionType', v)}
                  />
                  <ToggleGroup
                    label="Loan Purpose"
                    options={[
                      { value: 'purchase', label: 'Purchase' },
                      { value: 'refinance', label: 'Refinance' },
                    ]}
                    value={inputs.loanPurpose}
                    onChange={v => update('loanPurpose', v)}
                  />
                </div>
              </div>
              
              {/* Property */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Property</h3>
                <div className="grid sm:grid-cols-3 gap-5">
                  <InputField
                    label="Number of Units"
                    value={inputs.units}
                    onChange={v => update('units', Math.max(1, v))}
                    step={1}
                    min={1}
                  />
                  <InputField
                    label="Avg. Rent / Unit / Mo."
                    value={inputs.avgMonthlyRentPerUnit}
                    onChange={v => update('avgMonthlyRentPerUnit', v)}
                    prefix="$"
                    step={25}
                    min={0}
                  />
                  <InputField
                    label="Other Income / Unit / Mo."
                    value={inputs.otherIncomePerUnit}
                    onChange={v => update('otherIncomePerUnit', v)}
                    prefix="$"
                    step={5}
                    min={0}
                    hint="Parking, laundry, storage"
                  />
                </div>
              </div>

              {/* CMHC Imposed Constants */}
              <div className="bg-warm-gray border border-soft-gray p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="font-serif text-xl text-navy">CMHC Imposed Assumptions</h3>
                  <span className="text-[10px] tracking-[0.15em] uppercase bg-navy/8 text-navy/50 px-2 py-0.5">System</span>
                </div>
                <p className="text-navy/30 text-[12px] mb-4 leading-relaxed">
                  These values are set by CMHC and cannot be adjusted. Lenders must underwrite using these minimums regardless of actual property performance.
                </p>
                <div className="divide-y divide-soft-gray">
                  <ConstantRow 
                    label="Vacancy" 
                    value={`${CMHC_CONSTANTS.vacancyRate}%`}
                    tooltip="CMHC minimum vacancy assumption. Higher of 3% or market vacancy."
                  />
                  <ConstantRow 
                    label="Bad Debt" 
                    value={`${CMHC_CONSTANTS.badDebtRate}%`}
                    tooltip="CMHC standard bad debt / collection loss allowance."
                  />
                  <ConstantRow 
                    label="Management Fee" 
                    value={`${CMHC_CONSTANTS.managementRate}% of EGR`}
                    tooltip="Imposed regardless of self-management. CMHC assumes professional management costs."
                  />
                  <ConstantRow 
                    label="Repairs & Maintenance" 
                    value={`$${maintenancePerUnit}/unit/yr`}
                    tooltip={`CMHC R&M reserve: $750/unit for concrete, $975/unit for wood frame. Currently using ${inputs.constructionType === 'wood' ? 'wood frame' : 'concrete'} assumption.`}
                  />
                </div>
              </div>

              {/* Property-Specific Expenses */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-2">Property-Specific Expenses</h3>
                <p className="text-navy/30 text-[12px] mb-6">Annual amounts. These vary by property and are not standardized by CMHC.</p>
                <div className="grid sm:grid-cols-3 gap-5">
                  <InputField
                    label="Property Taxes"
                    value={inputs.propertyTaxes}
                    onChange={v => update('propertyTaxes', v)}
                    prefix="$"
                    step={1000}
                  />
                  <InputField
                    label="Utilities"
                    value={inputs.utilities}
                    onChange={v => update('utilities', v)}
                    prefix="$"
                    step={1000}
                    hint="Heat, hydro, water, gas"
                  />
                  <InputField
                    label="Insurance"
                    value={inputs.insurance}
                    onChange={v => update('insurance', v)}
                    prefix="$"
                    step={500}
                  />
                </div>
              </div>

              {/* Valuation - dynamic based on loan purpose */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-2">Valuation</h3>
                <p className="text-navy/30 text-[12px] mb-6">
                  {inputs.loanPurpose === 'purchase'
                    ? 'For purchases, LTV is based on the lesser of the purchase price or appraised value.'
                    : 'For refinances, LTV is based on the appraised value (lending value). Enter existing mortgage to calculate equity extraction.'}
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {inputs.loanPurpose === 'purchase' && (
                    <InputField
                      label="Purchase Price"
                      value={inputs.purchasePrice}
                      onChange={v => update('purchasePrice', v)}
                      prefix="$"
                      step={50000}
                    />
                  )}
                  <InputField
                    label="Appraised Value"
                    value={inputs.appraisedValue}
                    onChange={v => update('appraisedValue', v)}
                    prefix="$"
                    step={50000}
                    hint={inputs.loanPurpose === 'purchase' ? 'Leave same as purchase price if unknown' : 'Current market / lending value'}
                  />
                  {inputs.loanPurpose === 'refinance' && (
                    <InputField
                      label="Existing Mortgage Balance"
                      value={inputs.existingMortgage}
                      onChange={v => update('existingMortgage', v)}
                      prefix="$"
                      step={25000}
                      min={0}
                      hint="Outstanding balance on current mortgage"
                    />
                  )}
                </div>
                {results.pricePerUnit > 0 && (
                  <p className="text-navy/30 text-[12px] mt-3">
                    Lending value: {formatCurrency(results.lendingValue)} · {formatCurrency(results.pricePerUnit)} per unit · {formatPercent(results.capRate)} cap rate
                  </p>
                )}
              </div>

              {/* Rate Build */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-2">Contract Rate</h3>
                <p className="text-navy/30 text-[12px] mb-6">
                  CMHC-insured multifamily underwrites at the contract rate. No stress-test / qualification rate applies (that is OSFI B-20 for residential only).
                </p>
                <div className="grid sm:grid-cols-3 gap-5">
                  <InputField
                    label="5-Year CMB Yield"
                    value={inputs.cmbYield}
                    onChange={v => update('cmbYield', v)}
                    suffix="%"
                    step={0.05}
                    min={0}
                    hint="Canada Mortgage Bond yield"
                  />
                  <InputField
                    label="Lender Spread"
                    value={inputs.lenderSpread}
                    onChange={v => update('lenderSpread', v)}
                    suffix="%"
                    step={0.05}
                    min={0}
                    hint="Typical: 50-65 bps"
                  />
                  <div>
                    <label className="text-[12px] tracking-wide-custom uppercase text-navy/40 block mb-2">All-In Rate</label>
                    <div className="w-full border border-navy/15 bg-navy/[0.03] text-navy py-3 px-4 text-[15px] font-medium">
                      {formatPercent(results.contractRate)}
                    </div>
                    <p className="text-navy/25 text-[12px] mt-1">CMB + spread</p>
                  </div>
                </div>
              </div>

              {/* Amortization */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <h3 className="font-serif text-xl text-navy mb-6">Amortization</h3>
                <InputField
                  label="Amortization (Years)"
                  value={inputs.amortizationYears}
                  onChange={v => update('amortizationYears', v)}
                  step={5}
                  min={15}
                  max={50}
                  hint={`Standard max: 40 years${inputs.mliSelect && inputs.mliCredits >= 50 ? ' · MLI Select: up to 50 years' : ''}`}
                />
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
                      hint="50pts: 90% LTV, 50yr amort, 10% premium discount | 70pts: 20% discount | 100pts: 95% LTV, 1.00x DSCR, 30% discount"
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
                  {inputs.mliSelect && inputs.mliCredits >= 50 && (
                    <span className="block mt-1 text-navy/40">
                      Premium discount: {formatPercent(getMliPremiumDiscount(true, inputs.mliCredits) * 100, 0)} off base premium
                    </span>
                  )}
                </p>
              </div>

              {/* EGI Surcharge Toggle */}
              <div className="bg-white border border-soft-gray p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-navy">EGI Surcharge</h3>
                    <p className="text-navy/30 text-[12px] mt-1">
                      0.25% of net loan added if EGI target not met at first advance (CMHC Advice 264).
                    </p>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <span className="text-[13px] text-navy/40">{inputs.egiSurcharge ? 'Applied' : 'Not Applied'}</span>
                    <button
                      onClick={() => update('egiSurcharge', !inputs.egiSurcharge)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${inputs.egiSurcharge ? 'bg-navy' : 'bg-soft-gray'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${inputs.egiSurcharge ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </label>
                </div>
              </div>
            </div>

            {/* Results: 2 columns (sticky) */}
            <div className="xl:col-span-2">
              <div className="xl:sticky xl:top-28 space-y-6">
                
                {/* Primary Result */}
                <div className="bg-navy p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] tracking-[0.15em] uppercase bg-white/10 text-white/50 px-2 py-0.5">
                      {inputs.constructionType === 'wood' ? 'Wood Frame' : 'Concrete'}
                    </span>
                    <span className="text-[10px] tracking-[0.15em] uppercase bg-white/10 text-white/50 px-2 py-0.5">
                      {inputs.loanPurpose === 'purchase' ? 'Purchase' : 'Refinance'}
                    </span>
                  </div>
                  <p className="text-[11px] tracking-wide-custom uppercase text-gold mb-3">Maximum Insured Loan</p>
                  <p className="font-serif text-4xl sm:text-5xl text-white mb-2">
                    {formatCurrency(results.maxLoan)}
                  </p>
                  <p className="text-white/30 text-[13px] mb-6">
                    Constrained by {results.bindingConstraint} · {formatPercent(results.actualLTV * 100, 1)} LTV · {formatPercent(results.contractRate)} rate
                  </p>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">
                        CMHC Premium ({formatPercent(results.basePremiumRate * 100)}
                        {results.mliDiscount > 0 && ` − ${formatPercent(results.mliDiscount * 100, 0)} MLI`})
                      </span>
                      <span className="text-white">{formatCurrency(results.insurancePremium)}</span>
                    </div>
                    {inputs.egiSurcharge && (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-white/40">EGI Surcharge (0.25%)</span>
                        <span className="text-white">{formatCurrency(results.egiSurchargeAmount)}</span>
                      </div>
                    )}
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

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    {inputs.loanPurpose === 'purchase' ? (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-gold/60">Equity Required</span>
                        <span className="text-gold font-serif text-xl">{formatCurrency(results.equityRequired)}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-gold/60">Equity Extraction Available</span>
                        <span className="text-gold font-serif text-xl">{formatCurrency(results.equityExtraction)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">Year 1 Cash Flow</span>
                      <span className={results.cashFlow >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {formatCurrency(results.cashFlow)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-white/40">Cash-on-Cash Return</span>
                      <span className={results.cashOnCash >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {formatPercent(results.cashOnCash)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NOI Breakdown */}
                <div className="bg-white border border-soft-gray p-6 sm:p-8">
                  <h4 className="text-[12px] tracking-wide-custom uppercase text-navy/30 mb-5">NOI Build</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">Gross Rental Income</span>
                      <span className="text-navy">{formatCurrency(results.grossRentalIncome)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-navy/50">Other Income</span>
                      <span className="text-navy">{formatCurrency(results.otherIncome)}</span>
                    </div>
                    <div className="flex justify-between text-[13px] text-navy/35">
                      <span>Less: Vacancy ({CMHC_CONSTANTS.vacancyRate}%)</span>
                      <span>({formatCurrency(results.vacancyLoss)})</span>
                    </div>
                    <div className="flex justify-between text-[13px] text-navy/35">
                      <span>Less: Bad Debt ({CMHC_CONSTANTS.badDebtRate}%)</span>
                      <span>({formatCurrency(results.badDebtLoss)})</span>
                    </div>
                    <div className="flex justify-between text-[14px] pt-2 border-t border-soft-gray">
                      <span className="text-navy/60 font-medium">Effective Gross Income</span>
                      <span className="text-navy font-medium">{formatCurrency(results.egi)}</span>
                    </div>

                    <div className="pt-3 space-y-3">
                      <div className="flex justify-between text-[13px] text-navy/35">
                        <span>Property Taxes</span>
                        <span>({formatCurrency(inputs.propertyTaxes)})</span>
                      </div>
                      <div className="flex justify-between text-[13px] text-navy/35">
                        <span>Utilities</span>
                        <span>({formatCurrency(inputs.utilities)})</span>
                      </div>
                      <div className="flex justify-between text-[13px] text-navy/35">
                        <span>Insurance</span>
                        <span>({formatCurrency(inputs.insurance)})</span>
                      </div>
                      <div className="flex justify-between text-[13px] text-navy/35">
                        <span>Management ({CMHC_CONSTANTS.managementRate}% EGR)</span>
                        <span>({formatCurrency(results.managementFee)})</span>
                      </div>
                      <div className="flex justify-between text-[13px] text-navy/35">
                        <span>R&amp;M (${results.rmPerUnit}/unit · {inputs.constructionType === 'wood' ? 'wood' : 'concrete'})</span>
                        <span>({formatCurrency(results.maintenance)})</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-[14px] pt-2 border-t border-soft-gray">
                      <span className="text-navy/60 font-medium">Total Expenses</span>
                      <span className="text-navy font-medium">{formatCurrency(results.totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between text-[16px] pt-3 border-t border-navy/10">
                      <span className="text-navy font-medium">Net Operating Income</span>
                      <span className="text-navy font-serif text-lg">{formatCurrency(results.noi)}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-navy/35">Expense Ratio</span>
                      <span className="text-navy/50">{formatPercent(results.expenseRatio)}</span>
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
                        <span className="text-navy/40">Min DSCR Threshold</span>
                        <span className="text-navy">{results.dscrMin.toFixed(2)}x</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Max LTV</span>
                        <span className="text-navy">{formatPercent(results.ltvMax * 100, 0)}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Actual DSCR</span>
                        <span className="text-navy">{results.actualDSCR.toFixed(2)}x</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Effective Amortization</span>
                        <span className="text-navy">{results.effectiveAmort} years</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-navy/40">Lending Value Basis</span>
                        <span className="text-navy">{formatCurrency(results.lendingValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Schedule Reference */}
                <div className="bg-warm-gray border border-soft-gray p-6 sm:p-8">
                  <h4 className="text-[12px] tracking-wide-custom uppercase text-navy/30 mb-4">Premium Schedule (Advice 264)</h4>
                  <div className="space-y-2">
                    {[
                      { ltv: '≤ 65%', rate: '2.60%' },
                      { ltv: '≤ 70%', rate: '2.85%' },
                      { ltv: '≤ 75%', rate: '3.35%' },
                      { ltv: '≤ 80%', rate: '4.35%' },
                      { ltv: '≤ 85%', rate: '5.35%' },
                      { ltv: '≤ 90% (MLI)', rate: '5.90%' },
                      { ltv: '> 90% (MLI)', rate: '6.15%' },
                    ].map(row => (
                      <div key={row.ltv} className="flex justify-between text-[12px]">
                        <span className="text-navy/40">{row.ltv}</span>
                        <span className="text-navy/60">{row.rate}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-navy/25 text-[11px] mt-3">
                    Standard rental housing. MLI Select discounts: 50pts → 10%, 70pts → 20%, 100pts → 30% off premium.
                  </p>
                </div>

                {/* CTA */}
                <div className="bg-white border border-soft-gray p-6 sm:p-8 text-center">
                  <p className="font-serif text-lg text-navy mb-2">Need a lender-ready underwriting?</p>
                  <p className="text-navy/40 text-[14px] mb-5">
                    Our team can run a full underwriting with market-specific adjustments for your property.
                  </p>
                  <a
                    href="/#contact"
                    className="inline-block bg-navy text-white text-[12px] tracking-wide-custom uppercase font-medium px-8 py-3.5 hover:bg-navy-light transition-colors"
                  >
                    Request Underwriting
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="mt-16 sm:mt-20 max-w-3xl">
            <h3 className="font-serif text-2xl text-navy mb-4">Methodology</h3>
            <div className="text-navy/40 text-[14px] leading-relaxed space-y-3">
              <p>
                This calculator sizes CMHC-insured multifamily debt using institutional underwriting 
                standards. The maximum loan is the lesser of DSCR-constrained and LTV-constrained amounts.
                Insurance premiums reflect CMHC Advice 264 (effective July 14, 2025).
              </p>
              <p>
                <strong className="text-navy/60">Rate construction:</strong> The contract rate is built from the 
                5-year Canada Mortgage Bond (CMB) yield plus a lender spread, typically 50 to 65 basis points 
                for standard deals. There is no separate qualification or stress-test rate for CMHC-insured 
                multifamily lending (the OSFI B-20 stress test applies to residential mortgages only).
              </p>
              <p>
                <strong className="text-navy/60">CMHC-imposed assumptions:</strong> Vacancy ({CMHC_CONSTANTS.vacancyRate}%), 
                bad debt ({CMHC_CONSTANTS.badDebtRate}%), management fee ({CMHC_CONSTANTS.managementRate}% of EGR), 
                and Repairs &amp; Maintenance reserves ($750/unit for concrete, $975/unit for wood frame) are system 
                constants imposed by CMHC regardless of actual property operations.
              </p>
              <p>
                <strong className="text-navy/60">Loan purpose:</strong> Both purchase and refinance transactions 
                can access up to 85% LTV for standard market rental (up to 95% with MLI Select). For purchases, 
                the lending value is the lesser of the purchase price or appraised value. For refinances, the 
                lending value is based on the appraised value only.
              </p>
              <p>
                <strong className="text-navy/60">DSCR sizing:</strong> The maximum loan whose annual debt service 
                at the contract rate equals NOI divided by the minimum DSCR requirement (1.10x standard, 
                as low as 1.00x with MLI Select credits).
              </p>
              <p>
                <strong className="text-navy/60">MLI Select:</strong> Credits unlock enhanced terms: lower DSCR 
                minimums (down to 1.00x), higher LTV (up to 95%), longer amortization (up to 50 years), 
                and premium discounts (10 to 30%) for projects meeting CMHC&apos;s affordability, accessibility, 
                and climate compatibility criteria.
              </p>
              <p>
                <strong className="text-navy/60">EGI surcharge:</strong> An additional 0.25% of the net loan 
                amount is charged if the Effective Gross Income target is not met at first advance.
              </p>
              <p>
                Insurance premiums are estimated based on CMHC&apos;s published Advice 264 schedule and added to the base 
                loan amount. Actual premiums and underwriting may vary by lender and property. This tool is 
                for educational purposes. Contact our team for lender-ready underwriting.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 pt-8 border-t border-soft-gray max-w-3xl">
            <p className="text-navy/25 text-[11px] leading-relaxed font-sans">
              <strong className="text-navy/35">Disclaimer:</strong> This calculator is provided for informational and educational purposes only. 
              It does not constitute a loan commitment, pre-approval, mortgage offer, or financial, legal, or investment advice. 
              Results are estimates based on standard CMHC underwriting assumptions and publicly available rate data; actual loan 
              terms, insurance premiums, and eligibility are determined by your lender and CMHC based on property-specific 
              underwriting. Rate data is updated periodically and may not reflect real-time market conditions. Consult a licensed 
              mortgage professional before making financing decisions. Colliers International and its affiliates accept no liability 
              for decisions made based on the output of this tool.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
