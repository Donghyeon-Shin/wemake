import { makeSSRClient } from '~/supa-client';
import { seeNotification } from '../mutations';
import { getLoggedInUserId } from '../queries';
import type { Route } from './+types/see-notification';

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const { client } = makeSSRClient(request);
  const { notificationId } = params;
  const userId = await getLoggedInUserId(client);
  await seeNotification(client, { userId, notificationId: notificationId as string });
  return { ok: true };
};
