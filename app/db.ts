import { drizzle } from 'drizzle-orm/postgres-js'; // postgres version
import postgres from 'postgres';

// prepare: false는 Supabase가 connection pool을 관리하기 때문에 drizzle는 필요 없음
const clent = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(clent);

export default db;
