import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'react-router';
import type { Database } from '~/supa-client';

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from('profiles')
    .select(
      `
      profile_id,
      name,
      username,
      avatar,
      role,
      headline,
      bio
    `,
    )
    .eq('username', username)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getUserByProfileId = async (
  client: SupabaseClient<Database>,
  { profileId }: { profileId: string },
) => {
  const { data, error } = await client
    .from('profiles')
    .select(
      `
      profile_id,
      name,
      username,
      avatar,
      headline,
      bio,
      role
    `,
    )
    .eq('profile_id', profileId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getUserProducts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from('products')
    .select(
      `
      product_id,
      name,
      description,
      upvotes: stats->>upvotes,
      views: stats->>views,
      reviews: stats->>reviews,
      profiles!products_to_profiles!inner (
        profile_id
      )
      `,
    )
    .eq('profiles.username', username);
  if (error) throw new Error(error.message);
  return data;
};

export const getUserProductsByUserId = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from('products')
    .select(
      `
      product_id,
      name
      `,
    )
    .eq('profile_id', userId);
  if (error) throw new Error(error.message);
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from('community_post_list_view')
    .select('*')
    .eq('author_username', username);
  if (error) throw new Error(error.message);
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.auth.getUser();
  if (error || !data.user === null) {
    throw redirect('/auth/login');
  }
  return data.user.id;
};

export const getNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from('notifications')
    .select(
      `
      notification_id,
      type,
      source:profiles!source_id(profile_id, name, avatar),
      product:products!product_id(product_id, name),
      community_post:posts!post_id(post_id, title),
      seen,
      created_at
      `,
    )
    .eq('target_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const countNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { count, error } = await client
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('target_id', userId)
    .eq('seen', false);
  if (error) throw new Error(error.message);
  return count ?? 0;
};

export const getMessages = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from('messages_view')
    .select('*')
    .eq('profile_id', userId)
    .neq('other_profile_id', userId);
  if (error) throw new Error(error.message);
  return data;
};

export const getMessagesByMessageRoomId = async (
  client: SupabaseClient<Database>,
  { messageRoomId, userId }: { messageRoomId: number; userId: string },
) => {
  // User가 해당 메시지 방에 속해있는지 확인
  const { count, error: countError } = await client
    .from('message_room_members')
    .select('*', { count: 'exact', head: true })
    .eq('message_room_id', messageRoomId)
    .eq('profile_id', userId);

  if (countError) throw new Error(countError.message);
  if (count === 0) throw new Error('Message room not found');

  const { data, error } = await client
    .from('messages')
    .select('*')
    .eq('message_room_id', messageRoomId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

export const getRoomsParticipant = async (
  client: SupabaseClient<Database>,
  { messageRoomId, userId }: { messageRoomId: number; userId: string },
) => {
  // User가 해당 메시지 방에 속해있는지 확인
  const { count, error: countError } = await client
    .from('message_room_members')
    .select('*', { count: 'exact', head: true })
    .eq('message_room_id', messageRoomId)
    .eq('profile_id', userId);
  if (countError) throw new Error(countError.message);
  if (count === 0) throw new Error('Message room not found');

  const { data, error } = await client
    .from('message_room_members')
    .select('profile_id, profiles:profiles!profile_id(name, avatar)')
    .eq('message_room_id', messageRoomId)
    .neq('profile_id', userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
