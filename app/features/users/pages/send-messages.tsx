import { redirect } from 'react-router';
import z from 'zod';
import { makeSSRClient } from '~/supa-client';
import { getOrCreateRoom, sendMessage } from '../mutations';
import { getLoggedInUserId, getUserProfile } from '../queries';
import type { Route } from './+types/send-messages';

const formSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const formData = await request.formData();
  const { client } = makeSSRClient(request);
  const fromUserId = await getLoggedInUserId(client);
  const { profile_id: toUserId } = await getUserProfile(client, { username: params.username });

  const { data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { content } = parsedData;
  const messageRoomId = await getOrCreateRoom(client, {
    fromUserId,
    toUserId,
  });
  await sendMessage(client, { messageRoomId, senderId: fromUserId, content });
  return redirect(`/my/messages/${messageRoomId}`);
};
