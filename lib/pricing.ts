// Pricing model for DonutSMP money.
// 1B is always $20, which represents the maximum 30% discount.
// Full (pre-discount) rate is therefore $20 / 0.7 = ~$28.571 per 1B.

export const FULL_RATE_PER_B = 20 / 0.7 // ~28.571 USD per 1B before discount
export const FULL_RATE_PER_M = FULL_RATE_PER_B / 1000 // per million

export const MIN_M = 50 // 50M minimum
export const MAX_M = 5000 // 5B maximum
export const STEP_M = 50

// Discount grows with the amount and caps at 30%.
// Named tiers: 100M = 10%, 500M = 20%, 1B = 30% (and above).
const CURVE: [number, number][] = [
  [0, 0],
  [100, 0.1],
  [500, 0.2],
  [1000, 0.3],
  [5000, 0.3],
]

export function discountFor(amountM: number): number {
  if (amountM <= CURVE[0][0]) return CURVE[0][1]
  for (let i = 1; i < CURVE.length; i++) {
    const [x1, y1] = CURVE[i - 1]
    const [x2, y2] = CURVE[i]
    if (amountM <= x2) {
      const t = (amountM - x1) / (x2 - x1)
      return y1 + t * (y2 - y1)
    }
  }
  return 0.3
}

export function fullPrice(amountM: number): number {
  return amountM * FULL_RATE_PER_M
}

export function salePrice(amountM: number): number {
  return fullPrice(amountM) * (1 - discountFor(amountM))
}

// Round to a clean cent value for display/charging.
export function money(n: number): number {
  return Math.round(n * 100) / 100
}

// "1500" -> "1.5B", "500" -> "500M"
export function formatAmount(amountM: number): string {
  if (amountM >= 1000) {
    const b = amountM / 1000
    return `${Number.isInteger(b) ? b : b.toFixed(1)}B`
  }
  return `${amountM}M`
}
