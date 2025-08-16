import { Hero } from '~/common/components/layout/hero';
import { TeamCard } from '~/features/teams/components/team-card';
import type { Route } from './+types/teams';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Teams | wemake' }];
};

export default function Teams() {
  return (
    <div className='space-y-20'>
      <Hero title='Teams' subtitle='Find the perfect team for your project' />
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={index}
            id={`teamId-${index}`}
            leaderName='donghyeon'
            leaderAvatarUrl='https://github.com/donghyeon.png'
            positions={['React Developer', 'Backend Developer', 'Product Manager']}
            projectDescription='a new social media platform'
          />
        ))}
      </div>
    </div>
  );
}
