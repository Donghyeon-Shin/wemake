import client from '~/supa-client';

export const getUserProfile = async ({ username }: { username: string }) => {
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

export const getUserProducts = async ({ username }: { username: string }) => {
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

export const getUserPosts = async ({ username }: { username: string }) => {
  const { data, error } = await client
    .from('community_post_list_view')
    .select('*')
    .eq('author_username', username);
  if (error) throw new Error(error.message);
  return data;
};
