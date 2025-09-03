import { redirect } from 'react-router';
import z from 'zod';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/social-complete';

const paramsSchema = z.object({
  provider: z.enum(['kakao', 'github']),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect('/auth/login');
  }

  const { provider } = parsedData;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return redirect('/auth/login');
  }

  const { client, headers } = makeSSRClient(request);
  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  return redirect('/', { headers });
};
