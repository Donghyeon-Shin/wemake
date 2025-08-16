import { Hero } from '~/common/components/layout/hero';
import { CategoryCard } from '~/features/products/components/category-card';
import type { Route } from './+types/categories';

export const meta: Route.MetaFunction = () => [{ title: 'Product Categories | wemake' }];

export default function CategoriesPage() {
  return (
    <div className='space-y-10'>
      <Hero title='Categories' subtitle='Browse products by category' />
      {Array.from({ length: 10 }).map((_, index) => (
        <CategoryCard
          key={index}
          id={`${index}`}
          name={`Category Name ${index}`}
          description={`Category Description ${index}`}
        />
      ))}
    </div>
  );
}
