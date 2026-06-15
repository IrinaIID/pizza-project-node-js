import { pgTable, uuid, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const shipments = pgTable('shipments', {
  id: uuid('id').defaultRandom().primaryKey(),

  ingredientId: text('ingredient_id').notNull(),
  units: integer('units').notNull(),

  warehouse: text('warehouse').notNull(),
  country: text('country').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  status: text('status').notNull().default('RECEIVED'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
