import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const createReview = async (
  client: SupabaseClient<Database>,
  {
    productId,
    userId,
    rating,
    review,
  }: { productId: string; userId: string; rating: number; review: string },
) => {
  const { data, error } = await client.from('reviews').insert({
    product_id: +productId, // +productId는 number로 변환
    profile_id: userId,
    rating,
    review,
  });
  if (error) throw error;
  return data;
};

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    url,
    description,
    categoryId,
    icon,
    userId,
    howItWorks,
  }: {
    name: string;
    tagline: string;
    url: string;
    description: string;
    categoryId: number;
    icon: string;
    userId: string;
    howItWorks: string;
  },
) => {
  const { data, error } = await client
    .from('products')
    .insert({
      name,
      tagline,
      url,
      description,
      category_id: categoryId,
      icon,
      profile_id: userId,
      how_it_works: howItWorks,
    })
    .select('product_id')
    .single();
  if (error) throw error;
  return data;
};
