import { PostCard } from '~/features/community/components/post-card';
import type { Route } from './+types/profile-post';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Profile Post | wemake' }, { name: 'description', content: 'Profile Post' }];
};

export default function ProfilePost() {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={index}
          id={`postId-${index}`}
          title='What is the best productivity tool?'
          author='Donghyeon'
          authorAvatarUrl='https://github.com/apple.png'
          category='Productivity'
          postedAt='12 hours ago'
          expanded
        />
      ))}
    </div>
  );
}
