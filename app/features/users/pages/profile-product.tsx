import { ProductCard } from '~/features/products/components/product-card';
import type { Route } from './+types/profile-product';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Profile Product | wemake' },
    { name: 'description', content: 'Profile Product' },
  ];
};

export default function ProfileProduct() {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductCard
          key={index}
          to={`/products/${index}`}
          title={'Product Name'}
          description={'Product Description'}
          commentsCount={12}
          viewsCount={12}
          votesCount={120}
        />
      ))}
    </div>
  );
}
