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
