import {
  bigint,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { profiles } from '../users/schema';

export const topics = pgTable('topics', {
  topic_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const posts = pgTable('posts', {
  post_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  content: text().notNull(),
  upvotes: bigint({ mode: 'number' }).default(0),
  topic_id: bigint({ mode: 'number' }).references(() => topics.topic_id, {
    onDelete: 'cascade',
  }),
  profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const post_upvotes = pgTable(
  'post_upvotes',
  {
    post_id: bigint({ mode: 'number' }).references(() => posts.post_id, {
      onDelete: 'cascade',
    }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.post_id, table.profile_id] })],
);

export const post_replies = pgTable('post_replies', {
  post_reply_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  post_id: bigint({ mode: 'number' }).references(() => posts.post_id, {
    onDelete: 'cascade',
  }),
  // 대댓글 참조 제약조건(AnyPgColumn 타입을 사용해 대댓글 테이블의 post_reply_id 컬럼을 참조 : TypeScript 오류 해결)
  parent_id: bigint({ mode: 'number' }).references((): AnyPgColumn => post_replies.post_reply_id, {
    onDelete: 'cascade',
  }),
  profile_id: uuid()
    .references(() => profiles.profile_id, { onDelete: 'cascade' })
    .notNull(),
  reply: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
