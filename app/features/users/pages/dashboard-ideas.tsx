import { IdeaCard } from '~/features/ideas/components/idea-card';
import type { Route } from './+types/dashboard-ideas';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'My Ideas | Dashboard' }];
};

export default function DashboardIdeas() {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-semibold mb-6'>Claimed Ideas</h1>
      <div className='grid grid-cols-4 gap-6'>
        {Array.from({ length: 11 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={index + 1}
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations. and tracking of progress using a mobile app to track workouts and progress as well as a webiste to manage the business.'
            viewsCount={123}
            likesCount={12}
            postedAt='12 hours ago'
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
