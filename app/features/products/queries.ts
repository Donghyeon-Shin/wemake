import type { DateTime } from 'luxon';
import client from '~/supa-client';

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit = 10,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit?: number;
}) => {
  const { data, error } = await client
    .from('products')
    .select(
      'product_id, name, description, upvotes: stats->>upvotes, views: stats->>views, reviews: stats->>reviews',
    )
    .lte('created_at', endDate.toISO())
    .gte('created_at', startDate.toISO())
    .order('stats->>upvotes', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
};
