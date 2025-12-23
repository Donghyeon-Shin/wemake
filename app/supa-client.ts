import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import type { MergeDeep, SetFieldType, SetNonNullable } from 'type-fest';
import type { Database as SupabaseDatabase } from '../database.types';

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        messages_view: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['messages_view']['Row']>;
        };
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<SupabaseDatabase['public']['Views']['community_post_list_view']['Row']>,
            'author_avatar',
            string | null
          >;
        };
        gpt_ideas_view: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['gpt_ideas_view']['Row']>;
        };
        products_overview_view: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['products_overview_view']['Row']>;
        };
        community_post_detail: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['community_post_detail']['Row']>;
        };
      };
    };
  }
>;

// 브라우저 클라이언트
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const BrowserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

// 유저가 요청하면 SSR 클라이언트를 생성
export const makeSSRClient = (request: Request) => {
  const headers = new Headers(request.headers);

  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // supabase 쿠키 파싱(어떤 유저가 요청했는지 알 수 있음)
          const cookies = parseCookieHeader(request.headers.get('Cookie') ?? '');
          return cookies.map(({ name, value }) => ({ name, value: value ?? '' }));
        },
        setAll(cookiesToSet) {
          // supabase 쿠키 설정 (유저의 브라우저에 쿠기 설정)
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
          });
        },
      },
    },
  );

  return {
    client: serverSideClient,
    headers,
  };
};
