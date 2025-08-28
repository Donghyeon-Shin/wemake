import { DateTime } from 'luxon';
import { Link, type MetaFunction } from 'react-router';
import { PostCard } from '~/features/community/components/post-card';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import { JobCard } from '~/features/jobs/components/job-card';
import { ProductCard } from '~/features/products/components/product-card';
import { getProductsByDateRange } from '~/features/products/queries';
import { TeamCard } from '~/features/teams/components/team-card';
import { getPosts } from '../../features/community/queries';
import { Button } from '../components/ui/button';
import type { Route } from './+types/home';

export const meta: MetaFunction = () => {
  return [{ title: 'Home | wemake' }, { name: 'description', content: 'Welcome to wemake' }];
};

export async function loader() {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf('day'),
    endDate: DateTime.now().endOf('day'),
    limit: 7,
  });

  const posts = await getPosts({
    limit: 7,
    sorting: 'newest',
  });
  return { products, posts };
}

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
        {Array.from({ length: 11 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={`ideaId-${index}`}
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations. and tracking of progress using a mobile app to track workouts and progress as well as a webiste to manage the business.'
            viewsCount={123}
            likesCount={12}
            postedAt='12 hours ago'
            claimed={index % 2 === 0}
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
        {Array.from({ length: 11 }).map((_, index) => (
          <JobCard
            key={index}
            id={`jobId-${index}`}
            company='Tesla'
            companyLogoUrl='https://github.com/teslamotors.png'
            companyHq='San Francisco, CA'
            title='Senior Software Engineer'
            postedAt='12 hours ago'
            type='Full-time'
            positionLocation='Remote'
            salary='$100,000 - $120,000'
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
