import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { toggleUpvote } from '../mutations';
import type { Route } from './+types/upvote-post';

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const postId = params.postId;
  await toggleUpvote(client, { postId, userId });

  return { ok: true };
};
