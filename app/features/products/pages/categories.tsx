import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Product Categories | wemake' }];

export default function CategoriesPage() {
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Categories</h1>
      <p className='text-muted-foreground'>Browse products by category.</p>
    </div>
  );
}
