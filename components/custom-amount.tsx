'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  discountFor,
  formatAmount,
  fullPrice,
  MAX_M,
  MIN_M,
  money,
  salePrice,
  STEP_M,
} from '@/lib/pricing'

export function CustomAmount({
  onBuy,
}: {
  onBuy: (amountM: number) => void
}) {
  const [amountM, setAmountM] = useState(1000)

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

      <div className="mt-5">
        <input
          type="range"
          min={MIN_M}
          max={MAX_M}
          step={STEP_M}
          value={amountM}
          onChange={(e) => setAmountM(Number(e.target.value))}
          aria-label="Choose how much money to buy"
          className="w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{formatAmount(MIN_M)}</span>
          <span>{formatAmount(MAX_M)}</span>
        </div>
      </div>

      <Button className="mt-5 w-full font-semibold" onClick={() => onBuy(amountM)}>
        Buy {formatAmount(amountM)}
      </Button>
    </div>
  )
}
