import { PostCard } from '~/features/community/components/post-card';
import { getUserPosts } from '../queries';
import type { Route } from './+types/profile-post';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Profile Post | wemake' }, { name: 'description', content: 'Profile Post' }];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const posts = await getUserPosts({ username: params.username });
  return { posts };
};

export default function ProfilePost({ loaderData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-5'>
      {loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          author={post.author}
          authorAvatarUrl={post.author_avatar}
          category={post.topic}
          postedAt={post.created_at}
          expanded
        />
      ))}
    </div>
  );
}
