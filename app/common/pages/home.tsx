import { DateTime } from 'luxon';
import { Link, type MetaFunction } from 'react-router';
import { PostCard } from '~/features/community/components/post-card';
import { getPosts } from '~/features/community/queries';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import { getGptIdeas } from '~/features/ideas/queries';
import { JobCard } from '~/features/jobs/components/job-card';
import { getJobs } from '~/features/jobs/queries';
import { ProductCard } from '~/features/products/components/product-card';
import { getProductsByDateRange } from '~/features/products/queries';
import { TeamCard } from '~/features/teams/components/team-card';
import { getTeams } from '~/features/teams/queries';
import { Button } from '../components/ui/button';
import type { Route } from './+types/home';

export const meta: MetaFunction = () => {
  return [{ title: 'Home | wemake' }, { name: 'description', content: 'Welcome to wemake' }];
};

export const loader = async () => {
  const [products, posts, gptIdeas, jobs, teams] = await Promise.all([
    getProductsByDateRange({
      startDate: DateTime.now().startOf('day'),
      endDate: DateTime.now().endOf('day'),
      limit: 7,
    }),
    getPosts({
      limit: 7,
      sorting: 'newest',
    }),
    getGptIdeas({ limit: 7 }),
    getJobs({ limit: 11 }),
    getTeams({ limit: 7 }),
  ]);

  return { products, posts, gptIdeas, jobs, teams };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className='px-20 space-y-40'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tighter'>Today's Product</h2>
          <p className='text-xl font-light text-foreground'>
            The best products made by our community today.
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/products/leaderboard'>Explore all products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            to={`/products/${product.product_id}`}
            title={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tighter'>Latest Discussions</h2>
          <p className='text-xl font-light text-foreground'>
            The latest discussions made by our community.
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/community'>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author}
            authorAvatarUrl={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tighter'>IdeasGPT</h2>
          <p className='text-xl font-light text-foreground'>Find ideas for your next project.</p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/ideas'>Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {loaderData.gptIdeas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewsCount={idea.views}
            likesCount={idea.likes}
            postedAt={DateTime.fromISO(idea.created_at).toRelative() ?? ''}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tighter'>Latest Jobs</h2>
          <p className='text-xl font-light text-foreground'>Find your dream job.</p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/jobs'>Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {loaderData.jobs.map((job) => (
          <JobCard
            key={job.job_id}
            id={job.job_id}
            company={job.company_name}
            companyLogoUrl={job.company_logo_url}
            companyHq={job.company_location}
            title={job.position}
            postedAt={DateTime.fromISO(job.created_at).toRelative() ?? ''}
            type={job.job_type}
            positionLocation={job.location_type}
            salary={job.salary_range}
          />
        ))}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tighter'>Find a team mate</h2>
          <p className='text-xl font-light text-foreground'>
            Join a team looking for a new member.
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/teams'>Explore all teams &rarr;</Link>
          </Button>
        </div>
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
