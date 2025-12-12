import {
  bigint,
  boolean,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { posts } from '../community/schema';
import { products } from '../products/schema';

// TypeScript에서 오류가 나지 않도록 가짜 테이블을 만들어줌, Supabase에서 이미 auth Table이 있기 때문에 해당 코드는 실제 적용되지 않음 (따라서 export 하지 않음)
const users = pgSchema('auth').table('users', {
  id: uuid().primaryKey(),
});

export const roles = pgEnum('role', [
  'developer',
  'designer',
  'product Manager',
  'founder',
  'other',
]);

export const profiles = pgTable('profiles', {
  // 외래키 제약조건(Supabase에서는 auth Table에서 유저를 관리함, 따라서 이를 참조하는 테이블에서는 외래키 제약조건을 추가해줘야 함. auth Table에 없는 또 다른 Column을 만들기 위해)
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  bio: text(),
  role: roles().default('developer').notNull(),
  // 프로필 통계 정보 Json 타입으로 정의
  stats: jsonb().$type<{
    followers: number;
    following: number;
  }>(),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

// Many to Many 관계 정의
export const follwers = pgTable('followers', {
  // onDelete: 'cascade' : 참조하는 테이블의 데이터가 삭제되면 참조하는 테이블의 데이터도 삭제됨
  follower_id: uuid()
    .references(() => profiles.profile_id, { onDelete: 'cascade' })
    .notNull(),
  following_id: uuid()
    .references(() => profiles.profile_id, { onDelete: 'cascade' })
    .notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const notificationTypeEnum = pgEnum('notification_type', [
  'follow',
  'review',
  'reply',
  'mention', // @로 언급할 때
]);

export const notifications = pgTable('notifications', {
  notification_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  // 연결자(프로필)
  source_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  // product에 리뷰를 달았을 때 연결될 id
  product_id: bigint({ mode: 'number' }).references(() => products.product_id, {
    onDelete: 'cascade',
  }),
  // post에 댓글을 달았을 때 연결될 id
  post_id: bigint({ mode: 'number' }).references(() => posts.post_id, {
    onDelete: 'cascade',
  }),
  // 연결자(프로필)
  target_id: uuid()
    .references(() => profiles.profile_id, { onDelete: 'cascade' })
    .notNull(),
  seen: boolean().default(false).notNull(),
  type: notificationTypeEnum().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

// DM은 독자적으로 다른 폴더로 관리하는게 더 좋아보임
export const messageRooms = pgTable('message_rooms', {
  message_room_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable(
  'message_room_members',
  {
    message_room_id: bigint({ mode: 'number' }).references(() => messageRooms.message_room_id, {
      onDelete: 'cascade',
    }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.message_room_id, table.profile_id] })],
);

export const messages = pgTable('messages', {
  message_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  message_room_id: bigint({ mode: 'number' }).references(() => messageRooms.message_room_id, {
    onDelete: 'cascade',
  }),
  sender_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  content: text().notNull(),
  seen: boolean().notNull().default(false),
  created_at: timestamp().notNull().defaultNow(),
});
