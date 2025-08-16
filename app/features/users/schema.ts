import { jsonb, pgEnum, pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

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
  handline: text(),
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
  follower_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  following_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  created_at: timestamp().notNull().defaultNow(),
});
