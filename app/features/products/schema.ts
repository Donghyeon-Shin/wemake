import { sql } from 'drizzle-orm';
import {
  bigint,
  check,
  foreignKey,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { profiles } from '../users/schema';

export const products = pgTable(
  'products',
  {
    product_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    tagline: text().notNull(),
    description: text().notNull(),
    how_it_works: text().notNull(),
    icon: text().notNull(),
    url: text().notNull(),
    stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0 }),
    profile_id: uuid().notNull(),
    // 카테고리 외래키 제약조건(카테고리 테이블에 없는 데이터가 들어오면 null로 처리)
    category_id: bigint({ mode: 'number' }).references(() => categories.category_id, {
      onDelete: 'set null',
    }),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    // 외래키 원하는 이름으로 정의
    foreignKey({
      columns: [table.profile_id],
      foreignColumns: [profiles.profile_id],
      name: 'products_to_profiles',
    }).onDelete('cascade'),
  ],
);

export const categories = pgTable('categories', {
  category_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const product_upvotes = pgTable(
  'product_upvotes',
  {
    product_id: bigint({ mode: 'number' }).references(() => products.product_id, {
      onDelete: 'cascade',
    }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    // 복합 기본키 정의
    primaryKey({ columns: [table.product_id, table.profile_id] }),
  ],
);

export const reviews = pgTable(
  'reviews',
  {
    review_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    product_id: bigint({ mode: 'number' })
      .references(() => products.product_id, {
        onDelete: 'cascade',
      })
      .notNull(),
    profile_id: uuid()
      .references(() => profiles.profile_id, { onDelete: 'cascade' })
      .notNull(),
    rating: integer().notNull(),
    review: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    // sql 문법을 사용해 rating 값이 1~5 사이의 값이 들어오도록 제약조건 추가
    check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);
