import { Link, type MetaFunction } from 'react-router';
import { PostCard } from '~/features/community/components/post-card';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import { ProductCard } from '~/features/products/components/product-card';
import { Button } from '../components/ui/button';

export const meta: MetaFunction = () => {
  return [{ title: 'Home | wemake' }, { name: 'description', content: 'Welcome to wemake' }];
};

export default function Home() {
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
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            to={`/products/${index}`}
            title={'Product Name'}
            description={'Product Description'}
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
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
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            id={`postId-${index}`}
            title='What is the best productivity tool?'
            author='Donghyeon'
            authorAvatarUrl='https://github.com/apple.png'
            category='Productivity'
            timeAgo='12 hours ago'
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
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id='ideaId'
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations. and tracking of progress using a mobile app to track workouts and progress as well as a webiste to manage the business.'
            viewsCount={123}
            likesCount={12}
            timeAgo='12 hours ago'
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
