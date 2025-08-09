import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Submit Product | wemake' }];

export default function SubmitProductPage() {
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Submit a Product</h1>
      <p className='text-muted-foreground'>Share a product with the community.</p>
    </div>
  );
}
