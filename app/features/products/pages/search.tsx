import { data, Form } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/layout/hero';
import ProductPagination from '~/common/components/layout/product-pagination';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { ProductCard } from '~/features/products/components/product-card';
import type { Route } from './+types/search';

const paramsSchema = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
});

export const meta: Route.MetaFunction = () => [
  { title: 'Search Products | wemake' },
  { name: 'description', content: 'Search for products' },
];

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
};

export default function SearchProductsPage() {
  return (
    <div className='space-y-10'>
      <Hero title='Search' subtitle='Search for products by keywords.' />
      <Form className='flex justify-center max-w-screen-sm items-center mx-auto gap-2'>
        <Input name='query' placeholder='Search for products' className='text-lg' />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='space-y-5 w-full max-w-screen-md mx-auto'>
        {Array.from({ length: 11 }).map((_, index) => (
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
      <ProductPagination totalPages={10} />
    </div>
  );
}
