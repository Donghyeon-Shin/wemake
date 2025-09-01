import { redirect } from 'react-router';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/visit';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { error, data } = await client
    .from('products')
    .select('url')
    .eq('product_id', Number(params.productId))
    .single();

  if (error) {
    throw new Error('Failed to get product URL');
  }

  if (!data) {
    throw new Error('Product not found');
  }

  await client.rpc('track_event', {
    event_type: 'product_visit',
    event_data: {
      product_id: params.productId,
    },
  });

  return redirect(data.url);
};
