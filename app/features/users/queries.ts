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
