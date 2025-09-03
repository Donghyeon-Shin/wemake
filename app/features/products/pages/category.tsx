import { data, Form } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/layout/hero';
import ProductPagination from '~/common/components/layout/product-pagination';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { ProductCard } from '~/features/products/components/product-card';
import { getCategory, getCategoryPages, getProductsByCategory } from '~/features/products/queries';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/category';

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Developer Tools | wemake` },
  { name: 'description', content: `Browse products in the Developer Tools category` },
];

const paramsSchema = z.object({
  categoryId: z.coerce.number(),
});

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { client, headers } = makeSSRClient(request);
  const { success: searchParamsSuccess, data: searchParamsData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!searchParamsSuccess) {
    throw data({ error_code: 'invalid_page', message: 'Invalid page' }, { status: 400 });
  }
  const { data: paramsData, success: paramsSuccess } = await paramsSchema.safeParseAsync(params);
  if (!paramsSuccess) throw new Error('Invalid params');
  const category = await getCategory(client, { categoryId: paramsData.categoryId });
  const products = await getProductsByCategory(client, {
    categoryId: paramsData.categoryId,
    page: searchParamsData.page,
  });
  const totalPages = await getCategoryPages(client, { categoryId: paramsData.categoryId });
  return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <Hero title={loaderData.category.name} subtitle={loaderData.category.description} />
      <Form className='flex justify-center max-w-screen-sm items-center mx-auto gap-2'>
        <Input name='query' placeholder='Search for products' className='text-lg' />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='space-y-5 w-full max-w-screen-md mx-auto'>
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
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
