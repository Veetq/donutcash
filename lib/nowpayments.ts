import crypto from 'node:crypto'

const API_URL = 'https://api.nowpayments.io/v1'

function apiKey() {
  const value = process.env.NOWPAYMENTS_API_KEY
  if (!value) throw new Error('NOWPAYMENTS_API_KEY is not configured')
  return value
}

export type NowPayment = {
  payment_id: string
  pay_address?: string
  pay_amount?: number
  pay_currency: string
  payment_status: string
}

const FALLBACK_CURRENCIES = ['btc', 'eth', 'ltc', 'doge', 'sol', 'trx', 'usdttrc20', 'usdc', 'bnb', 'xmr']

export async function getNowCurrencies() {
  const response = await fetch(`${API_URL}/currencies`, { headers: { 'x-api-key': apiKey() }, next: { revalidate: 300 } })
  if (!response.ok) throw new Error('NOWPayments currencies unavailable')
  const data = (await response.json()) as { currencies?: string[] }
  return (data.currencies ?? FALLBACK_CURRENCIES).filter((currency) => /^[a-z0-9]+$/i.test(currency)).slice(0, 80)
}

export function isAllowedCurrency(currency: string) {
  return /^[a-z0-9]{2,20}$/i.test(currency)
}

export async function createNowPayment(input: {
  priceUsd: number
  orderNumber: string
  ign: string
  amountMillions: number
  payCurrency: string
}) {
  const response = await fetch(`${API_URL}/payment`, {
    method: 'POST',
    headers: { 'x-api-key': apiKey(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price_amount: input.priceUsd,
      price_currency: 'usd',
      pay_currency: input.payCurrency.toLowerCase(),
      order_id: input.orderNumber,
      order_description: `${input.amountMillions}M DonutSMP money for ${input.ign}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')}/api/payments/nowpayments/webhook`,
    }),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('NOWPayments could not create the payment')
  return (await response.json()) as NowPayment
}

export function verifyIpnSignature(rawBody: string, signature: string | null) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET
  if (!secret || !signature) return false
  const expected = crypto.createHmac('sha512', secret).update(rawBody).digest('hex')
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(signature, 'utf8')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
