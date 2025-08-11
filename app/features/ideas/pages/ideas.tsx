import { Hero } from '~/common/components/layout/hero';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import type { Route } from './+types/ideas';

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: 'IdeasGPT | wemake',
    },
    { name: 'description', content: 'Find ideas for your next project' },
  ];
};

export default function Ideas() {
  return (
    <div className='space-y-10'>
      <Hero title='IdeasGPT' subtitle='Find ideas for your next project' />
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={index}
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations. and tracking of progress using a mobile app to track workouts and progress as well as a webiste to manage the business.'
            viewsCount={123}
            likesCount={12}
            postedAt='12 hours ago'
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
