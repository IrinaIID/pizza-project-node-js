import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const shipments = pgTable('shipments', {
  id: uuid('id').defaultRandom().primaryKey(),

  ingredientId: text('ingredient_id').notNull(),
  units: integer('units').notNull(),

  warehouse: text('warehouse').notNull(),
  country: text('country').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
