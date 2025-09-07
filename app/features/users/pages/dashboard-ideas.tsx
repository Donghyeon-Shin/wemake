import { IdeaCard } from '~/features/ideas/components/idea-card';
import { getClaimedIdeas } from '~/features/ideas/queries';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '../queries';
import type { Route } from './+types/dashboard-ideas';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'My Ideas | Dashboard' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, { userId });
  return { ideas };
};

export default function DashboardIdeas({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-semibold mb-6'>Claimed Ideas</h1>
      <div className='grid grid-cols-4 gap-6'>
        {loaderData.ideas.map((idea) => (
          <IdeaCard key={idea.gpt_idea_id} id={idea.gpt_idea_id} title={idea.idea} owner={true} />
        ))}
      </div>
    </div>
  );
}
