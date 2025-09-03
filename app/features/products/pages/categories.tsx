import { Hero } from '~/common/components/layout/hero';
import { CategoryCard } from '~/features/products/components/category-card';
import { getCategories } from '~/features/products/queries';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/categories';

export const meta: Route.MetaFunction = () => [{ title: 'Product Categories | wemake' }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <Hero title='Categories' subtitle='Browse products by category' />
      <div className='grid grid-cols-4 gap-10'>
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
