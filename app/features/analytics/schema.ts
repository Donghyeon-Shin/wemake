import { jsonb, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const eventTypes = pgEnum('event_type', ['product_view', 'product_visit', 'profile_view']);

export const events = pgTable('events', {
  event_id: uuid().primaryKey().defaultRandom(),
  event_type: eventTypes().notNull(),
  event_data: jsonb(),
  created_at: timestamp().defaultNow(),
});
