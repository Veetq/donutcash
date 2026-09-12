'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const DISCORD_URL = 'https://discord.gg/9FHdCBQAx'

export function OrderHandoff({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Your order code">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between"><div><p className="text-sm font-semibold text-primary">Order created</p><h2 className="mt-1 font-display text-2xl font-bold">Save your order code</h2></div><button type="button" onClick={onClose} className="text-2xl leading-none text-muted-foreground hover:text-foreground" aria-label="Close">×</button></div>
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Order ID</p><p className="mt-2 break-all font-mono text-2xl font-bold tracking-wider text-primary">{code}</p><Button type="button" variant="outline" className="mt-4" onClick={copyCode}>{copied ? 'Copied' : 'Copy code'}</Button></div>
        <div className="mt-6 flex gap-4"><div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">2</div><div><h3 className="font-semibold">Join Discord</h3><p className="mt-1 text-sm text-muted-foreground">Open a ticket and paste this code so we know exactly what to deliver.</p><a href={DISCORD_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Join Discord</a></div></div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Keep this code until your order is complete.</p>
      </div>
    </div>
  )
}
