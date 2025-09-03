import { ProductCard } from '~/features/products/components/product-card';
import { makeSSRClient } from '~/supa-client';
import { getUserProducts } from '../queries';
import type { Route } from './+types/profile-product';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Profile Product | wemake' },
    { name: 'description', content: 'Profile Product' },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const products = await getUserProducts(client, { username: params.username });
  return { products };
};

export default function ProfileProduct({ loaderData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-5'>
      {loaderData.products.map((product) => (
        <ProductCard
          key={product.product_id}
          to={`/products/${product.product_id}`}
          title={product.name}
          description={product.description}
          reviewsCount={product.reviews}
          viewsCount={product.views}
          votesCount={product.upvotes}
        />
      ))}
    </div>
  );
}
