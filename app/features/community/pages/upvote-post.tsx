import type { Route } from './+types/upvote-post';

export const action = async ({ request }: Route.ActionArgs) => {
  console.log('upvote-post');
  const formData = await request.formData();
  const postId = formData.get('postId');
  console.log(postId);
  return { ok: true };
};
