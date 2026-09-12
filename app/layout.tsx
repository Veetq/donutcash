import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: 'DonutCash.shop — Instant DonutSMP Money',
  description:
    'Buy DonutSMP in-game money and spawners. 1B for $20, with manual delivery through Discord.',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a560053c-4777-4c65-a158-c3befe2a15e2-Xf6DWmF3CJQXDOLaO266EGP3GSwxES.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d1f16',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${inter.variable} ${sora.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
