import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    userId,
    name,
    role,
    headline,
    bio,
  }: {
    userId: string;
    name: string;
    role: 'developer' | 'designer' | 'product Manager' | 'founder' | 'other';
    headline: string;
    bio: string;
  },
) => {
  const { error } = await client
    .from('profiles')
    .update({
      name,
      role,
      headline,
      bio,
    })
    .eq('profile_id', userId);
  if (error) throw new Error(error.message);
};

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  {
    userId,
    avatarUrl,
  }: {
    userId: string;
    avatarUrl: string;
  },
) => {
  const { error } = await client
    .from('profiles')
    .update({
      avatar: avatarUrl,
    })
    .eq('profile_id', userId);
  if (error) throw new Error(error.message);
};

export const seeNotification = async (
  client: SupabaseClient<Database>,
  { userId, notificationId }: { userId: string; notificationId: string },
) => {
  const { error } = await client
    .from('notifications')
    .update({ seen: true })
    .eq('notification_id', Number(notificationId))
    .eq('target_id', userId);
  if (error) throw new Error(error.message);
};

export const getOrCreateRoom = async (
  client: SupabaseClient<Database>,
  { fromUserId, toUserId }: { fromUserId: string; toUserId: string },
) => {
  const { data, error } = await client
    .rpc('get_room', {
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (data?.message_room_id) {
    return data.message_room_id;
  }
  const { data: newRoomData, error: newRoomError } = await client
    .from('message_rooms')
    .insert({})
    .select('message_room_id')
    .single();
  if (newRoomError) throw new Error(newRoomError.message);

  await client.from('message_room_members').insert([
    {
      message_room_id: newRoomData.message_room_id,
      profile_id: fromUserId,
    },
    {
      message_room_id: newRoomData.message_room_id,
      profile_id: toUserId,
    },
  ]);

  return newRoomData.message_room_id;
};

export const sendMessage = async (
  client: SupabaseClient<Database>,
  {
    messageRoomId,
    senderId,
    content,
  }: { messageRoomId: number; senderId: string; content: string },
) => {
  const { error } = await client.from('messages').insert({
    message_room_id: messageRoomId,
    sender_id: senderId,
    content: content,
  });
  if (error) throw new Error(error.message);
};
