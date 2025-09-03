import { redirect } from 'react-router';
import z from 'zod';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/social-start';

const paramsSchema = z.object({
  provider: z.enum(['kakao', 'github']),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect('/auth/login');
  }

  const { provider } = parsedData;
  const redirectTo = `http://localhost:5173/auth/social/${provider}/complete`;
  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  if (url) {
    // 소셜로그인을 시작하면 supabase client가 브라우저에 쿠키를 넣어주고 다시 callBack했을 때 같은 기기에서 로그인 과정을 시작했다는 것을 알 수 있음.
    // (사람들이 이 과정을 한 기기에서만 할 수 있도록 하는 방법)
    return redirect(url, { headers });
    // 성공적으로 redirect되어 온 경우 supabase의 User 테이블에 자동으로 유저 정보가 들어감
  }

  if (error) {
    throw error;
  }
};
