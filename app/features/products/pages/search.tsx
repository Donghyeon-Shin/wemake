import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Search Products | wemake' }];

export default function SearchProductsPage() {
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Search</h1>
      <p className='text-muted-foreground'>Find products by keywords.</p>
    </div>
  );
}
