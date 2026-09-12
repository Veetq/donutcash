import crypto from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE = 'donutcash_admin'
function secret() {
  const value = process.env.ADMIN_DASHBOARD_SECRET
  if (!value || value.length < 32) throw new Error('ADMIN_DASHBOARD_SECRET must be configured with at least 32 characters')
  return value
}
function token() { return crypto.createHmac('sha256', secret()).update('donutcash-admin-session').digest('hex') }
export async function isAdmin() { return (await cookies()).get(COOKIE)?.value === token() }
export async function setAdminSession() { (await cookies()).set(COOKIE, token(), { httpOnly: true, secure: true, sameSite: 'lax', path: '/admin', maxAge: 60 * 60 * 8 }) }
export async function clearAdminSession() { (await cookies()).delete(COOKIE) }
export function safeEqual(a: string, b: string) { const aa = Buffer.from(a); const bb = Buffer.from(b); return aa.length === bb.length && crypto.timingSafeEqual(aa, bb) }
export function adminSecretMatches(value: string) { return safeEqual(value, secret()) }
