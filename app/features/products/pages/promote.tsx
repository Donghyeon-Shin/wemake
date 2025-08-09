import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Promote Product | wemake' }];

export default function PromoteProductPage() {
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Promote a Product</h1>
      <p className='text-muted-foreground'>Boost visibility of a product.</p>
    </div>
  );
}
