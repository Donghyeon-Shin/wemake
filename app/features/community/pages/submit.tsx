import { Form, redirect } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import { InputPair } from '~/common/components/ui/input-pair';
import { SelectPair } from '~/common/components/ui/select-pair';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { createPost } from '../mutations';
import { getTopics } from '../queries';
import type { Route } from './+types/submit';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Submit | wemake' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client); // 로그인 확인
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(40, 'Title must be less than 40 characters'),
  category: z.string().min(1, 'Category is required'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  }
  const { title, category, content } = parsedData;
  const post = await createPost(client, { title, category, content, userId });
  return redirect(`/community/${post.post_id}`);
};

export default function Submit({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title='Create Discussion' subtitle='Create a new discussion' />
      <Form className='flex flex-col gap-10 max-w-screen-md mx-auto' method='post'>
        <InputPair
          label='Title'
          name='title'
          id='title'
          description='(40 characters max)'
          maxLength={40}
          required
          placeholder='i.e. What is the best productivity tool?'
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className='text-red-500'>{actionData.fieldErrors.title?.join(', ')}</p>
        )}
        <SelectPair
          label='Category'
          name='category'
          required
          placeholder='i.e. Productivity'
          options={loaderData.topics.map((topic) => ({
            label: topic.name,
            value: topic.slug,
          }))}
          description='Select a category'
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className='text-red-500'>{actionData.fieldErrors.category?.join(', ')}</p>
        )}
        <InputPair
          label='Content'
          name='content'
          id='content'
          description='(1000 characters max)'
          required
          placeholder='i.e. I am looking for a tool that can help me manage my time and improve my productivity.'
          textarea
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className='text-red-500'>{actionData.fieldErrors.content?.join(', ')}</p>
        )}
        <Button type='submit' className='mx-auto'>
          Create Discussion
        </Button>
      </Form>
    </div>
  );
}
