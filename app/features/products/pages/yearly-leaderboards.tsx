import { useParams, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Yearly Leaderboards | wemake' }];

export default function YearlyLeaderboardsPage() {
  const { year } = useParams();
  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-3xl font-bold'>Yearly Leaderboards</h1>
      <p className='text-muted-foreground'>Year: {year}</p>
    </div>
  );
}
