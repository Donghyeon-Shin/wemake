import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/features/**/schema.ts', // 데이터베이스 스키마 정의 파일 경로
  out: './app/migrations', // drizzle kit이 생성한 sql 파일을 저장할 경로
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
