'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  discountFor,
  formatAmount,
  fullPrice,
  MAX_M,
  MIN_M,
  money,
  salePrice,
} from '@/lib/pricing'

export function CustomAmount({
  onBuy,
}: {
  onBuy: (amountM: number) => void
}) {
  const [amountInput, setAmountInput] = useState('1b')

  const parsedAmountM = useMemo(() => {
    const match = amountInput.trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(m|b)?$/)
    if (!match) return null
    const value = Number(match[1])
    const amountM = match[2] === 'b' ? value * 1000 : value
    return amountM >= MIN_M && amountM <= 10000 ? amountM : null
  }, [amountInput])
  const amountM = parsedAmountM ?? 1000
  const price = money(salePrice(amountM))
  const was = money(fullPrice(amountM))
  const pct = Math.round(discountFor(amountM) * 100)
  return (
    <div className="relative flex flex-col rounded-2xl border border-dashed border-primary/50 bg-card p-6 sm:col-span-2 lg:col-span-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Build your own</span>
        <span className="rounded-md bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
          -{pct}%
        </span>
      </div>

      <label htmlFor="custom-money-amount" className="mt-5 text-sm font-semibold text-foreground">Your amount</label>
      <input id="custom-money-amount" type="text" inputMode="decimal" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} placeholder="10m or 1b" aria-describedby="custom-money-error" className="mt-2 rounded-lg border border-input bg-background px-3 py-2 text-sm font-semibold outline-none transition-colors focus:border-primary" />
      {amountInput.trim() && parsedAmountM === null && <p id="custom-money-error" className="mt-2 text-xs font-medium text-destructive">Enter an amount from 50M to 10B, such as 250, 10m, or 2b.</p>}

      <div className="mt-4 font-display text-4xl font-bold tracking-tight">
        {formatAmount(amountM)}
        <span className="ml-1 align-middle text-base font-medium text-muted-foreground">
          money
        </span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="font-display text-3xl font-bold text-primary">${price}</span>
        <span className="mb-1 text-sm text-muted-foreground line-through">${was}</span>
      </div>

      <Button className="mt-5 w-full font-semibold" onClick={() => parsedAmountM !== null && onBuy(parsedAmountM)} disabled={parsedAmountM === null}>
        Buy {formatAmount(amountM)}
      </Button>
    </div>
  )
}
