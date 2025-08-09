import { useParams, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Monthly Leaderboards | wemake' }];

export default function MonthlyLeaderboardsPage() {
  const { year, month } = useParams();
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Monthly Leaderboards</h1>
      <p className='text-muted-foreground'>
        Year: {year} / Month: {month}
      </p>
    </div>
  );
}
