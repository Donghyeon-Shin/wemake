import { Hero } from '~/common/components/layout/hero';
import { TeamCard } from '~/features/teams/components/team-card';
import { makeSSRClient } from '~/supa-client';
import { getTeams } from '../queries';
import type { Route } from './+types/teams';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Teams | wemake' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const teams = await getTeams(client, { limit: 8 });
  return { teams };
};

export default function Teams({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title='Teams' subtitle='Find the perfect team for your project' />
      <div className='grid grid-cols-4 gap-4'>
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderName={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(', ')}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
