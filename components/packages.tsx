'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { CustomAmount } from '@/components/custom-amount'
import { OrderHandoff } from '@/components/order-handoff'
import { discountFor, formatAmount, fullPrice, money, salePrice } from '@/lib/pricing'
import { STORE_STOCK } from '@/lib/store-config'

const SPAWNER_IMAGE = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/skeleton-spawner-cbK553xjE3H0jzkko7pHIJEmCWfQ3K.png'

type Product = 'money' | 'spawners'

type Pkg = { id: string; label: string; amountM: number; popular?: boolean }
const PACKAGES: Pkg[] = [
  { id: '100m', label: 'Snack', amountM: 100 },
  { id: '500m', label: 'Starter', amountM: 500 },
  { id: '1b', label: 'Popular', amountM: 1000, popular: true },
  { id: '2b', label: 'Grinder', amountM: 2000 },
  { id: '5b', label: 'Baller', amountM: 5000 },
]

export function Packages() {
  const [product, setProduct] = useState<Product>('money')
  const [spawners, setSpawners] = useState(1)
  const [orderCode, setOrderCode] = useState<string | null>(null)
  const [creatingOrder, setCreatingOrder] = useState(false)
  const spawnerDiscount = Math.min(30, Math.max(0, Math.round(((spawners - 20) / 80) * 30)))
  const spawnerPrice = spawners * 0.4 * (1 - spawnerDiscount / 100)
  useEffect(() => {
    if (!creatingOrder) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [creatingOrder])

  function createOrder(productType: Product, quantity: number) {
    setCreatingOrder(true)
    setOrderCode(null)
    const prefix = productType === 'money' ? `C${quantity}` : `S${quantity}`
    const suffix = Array.from({ length: 6 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
    window.setTimeout(() => {
      setOrderCode(`${prefix}${suffix}`)
      setCreatingOrder(false)
    }, 700)
  }

  return (
    <section id="packages" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">Pick what you need</h2>
        <p className="mt-3 text-muted-foreground">Choose DonutSMP money or spawners, then message us on Discord to complete your order.</p>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <div className="relative flex rounded-xl border border-border bg-card p-1">
          <span className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-primary shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${product === 'spawners' ? 'translate-x-full' : 'translate-x-0'}`} aria-hidden="true" />
          {(['money', 'spawners'] as Product[]).map((item) => (
            <button key={item} type="button" onClick={() => setProduct(item)} className={`relative z-10 flex-1 rounded-lg px-4 py-3 text-sm font-semibold capitalize transition-colors duration-300 ${product === item ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              {item === 'money' ? 'DonutSMP Money' : 'Spawners'}
            </button>
          ))}
        </div>
        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${product === 'money' ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`} aria-hidden={product !== 'money'}>
          <div className="overflow-hidden">
            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm"><span className="size-2 animate-pulse rounded-full bg-primary shadow-[0_0_12px_currentColor]" /><span className="font-semibold text-primary">{STORE_STOCK.moneyM.toLocaleString()}M in stock</span><span className="text-muted-foreground">available across money packages</span></div>
          </div>
        </div>
      </div>

      {product === 'money' ? (
        <div key="money" className="animate-product-in">
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const price = money(salePrice(pkg.amountM)); const was = money(fullPrice(pkg.amountM)); const pct = Math.round(discountFor(pkg.amountM) * 100)
              return <div key={pkg.id} className={`interactive-card relative flex flex-col rounded-2xl border bg-card p-6 ${pkg.popular ? 'border-primary/60' : 'border-border hover:border-primary/40'}`}>
                {pkg.popular && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Most popular</span>}
                <div className="flex items-center justify-between gap-2"><span className="text-sm font-medium text-muted-foreground">{pkg.label}</span><div className="mt-2 flex justify-end"><span className="rounded-md bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">-{pct}%</span></div></div>
                <div className="mt-4 font-display text-4xl font-bold tracking-tight">{formatAmount(pkg.amountM)}<span className="ml-1 align-middle text-base font-medium text-muted-foreground">money</span></div>
                <div className="mt-4 flex items-end gap-2"><span className="font-display text-3xl font-bold text-primary">${price}</span><span className="mb-1 text-sm text-muted-foreground line-through">${was}</span></div>
                <Button className="mt-6 w-full font-semibold transition-transform hover:scale-[1.02]" onClick={() => createOrder('money', pkg.amountM)} disabled={creatingOrder}>Buy {formatAmount(pkg.amountM)}</Button>
              </div>
            })}
            <CustomAmount onBuy={(amountM) => createOrder('money', amountM)} />
          </div>
        </div>
      ) : (
        <div className="interactive-card mx-auto mt-12 grid max-w-3xl gap-6 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center justify-center bg-background/60 p-8"><img src={SPAWNER_IMAGE} alt="Minecraft spawner" className="float-soft h-56 w-56 object-contain drop-shadow-[0_18px_28px_rgba(20,184,166,0.22)] transition-transform duration-500 hover:scale-105" /></div>
          <div className="p-6 md:p-8"><div className="flex items-center justify-between gap-3"><p className="text-sm font-medium text-muted-foreground">Skeleton Spawner</p><span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{STORE_STOCK.spawners} in stock</span></div><h3 className="mt-2 font-display text-3xl font-bold">Build your spawner stack</h3><p className="mt-3 text-sm text-muted-foreground">Better value on bigger orders.</p>
            <div className="mt-6 flex items-end justify-between"><div><span className="font-display text-4xl font-bold text-primary">{spawners}</span><span className="ml-2 text-muted-foreground">spawner{spawners === 1 ? '' : 's'}</span></div><div className="text-right"><span className="mb-1 inline-block rounded-md bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">-{spawnerDiscount}%</span><span className="block font-display text-3xl font-bold">${spawnerPrice.toFixed(2)}</span></div></div>
            <div className="mt-6 flex items-center gap-3">
              <input type="range" min="1" max="500" step="1" value={spawners} onInput={(e) => setSpawners(Number(e.currentTarget.value))} onChange={(e) => setSpawners(Number(e.currentTarget.value))} aria-label="Choose number of spawners" className="h-2 min-w-0 flex-1 cursor-pointer accent-primary" />
              <input type="number" min="1" max="500" step="1" value={spawners} onChange={(e) => setSpawners(Math.min(500, Math.max(1, Number(e.target.value) || 1)))} aria-label="Spawner quantity" className="w-20 rounded-lg border border-input bg-background px-2 py-2 text-center text-sm font-semibold" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>1 spawner</span><span>500 spawners</span></div>
            <Button className="mt-6 w-full font-semibold transition-transform hover:scale-[1.02]" onClick={() => createOrder('spawners', spawners)} disabled={creatingOrder}>Buy {spawners} spawner{spawners === 1 ? '' : 's'}</Button>
          </div>
        </div>
      )}
      {creatingOrder && typeof document !== 'undefined' && createPortal(<div className="order-loading-backdrop fixed inset-0 z-[100] grid h-[100dvh] w-screen place-items-center overflow-hidden bg-background/80 p-4 backdrop-blur-sm" role="status" aria-live="polite"><div className="order-loading rounded-2xl border border-primary/30 bg-card px-8 py-7 text-center shadow-2xl"><div className="mx-auto mb-4 size-9 animate-spin rounded-full border-2 border-primary/25 border-t-primary" /><p className="font-display text-lg font-bold">Creating your order...</p><p className="mt-1 text-sm text-muted-foreground">Generating a secure order ID</p></div></div>, document.body)}
      {orderCode && <OrderHandoff code={orderCode} onClose={() => setOrderCode(null)} />}
    </section>
  )
}
