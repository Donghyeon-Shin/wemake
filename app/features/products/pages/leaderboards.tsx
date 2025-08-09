import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Product Leaderboards | wemake' }];

export default function LeaderboardsPage() {
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Leaderboards</h1>
      <p className='text-muted-foreground'>Browse top products by time period.</p>
    </div>
  );
}
