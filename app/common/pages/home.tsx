import { type MetaFunction } from 'react-router';
import { ProductCard } from '~/features/products/components/product-card';

export const meta: MetaFunction = () => {
  return [{ title: 'Home | wemake' }, { name: 'description', content: 'Welcome to wemake' }];
};

export default function Home() {
  return (
    <div className='px-20'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tighter'>Today's Product</h2>
          <p className='text-xl font-light text-foreground'>
            The best products made by our community today.
          </p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
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
    </div>
  );
}
