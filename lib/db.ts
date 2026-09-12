import { drizzle } from 'drizzle-orm/node-postgres'
import { pgTable, text, integer, numeric, timestamp, uuid } from 'drizzle-orm/pg-core'
import { Pool } from 'pg'

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  ign: text('ign').notNull(),
  amountMillions: integer('amount_millions').notNull(),
  priceUsd: numeric('price_usd', { precision: 10, scale: 2 }).notNull(),
  discountPercent: integer('discount_percent').notNull(),
  paymentId: text('payment_id').unique(),
  paymentStatus: text('payment_status').notNull().default('waiting'),
  fulfillmentStatus: text('fulfillment_status').notNull().default('unfulfilled'),
  payCurrency: text('pay_currency').notNull(),
  payAmount: numeric('pay_amount', { precision: 24, scale: 12 }),
  payAddress: text('pay_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

import { randomUUID } from 'crypto'

export function orderId() {
  return randomUUID()
}

export function orderNumber() {
  return `DC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}
