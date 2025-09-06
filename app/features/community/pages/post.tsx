import { ChevronUpIcon, DotIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';
import { data, Form, Link, useOutletContext } from 'react-router';
import z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb';
import { Button } from '~/common/components/ui/button';
import { Textarea } from '~/common/components/ui/textarea';
import { getLoggedInUserId } from '~/features/users/queries';
import { makeSSRClient } from '~/supa-client';
import { Reply } from '../components/reply';
import { createReply } from '../mutations';
import { getPostById, getReplies } from '../queries';
import type { Route } from './+types/post';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Post | wemake' }];
};

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

const formSchema = z.object({
  reply: z.string().min(1, 'Reply is required'),
  topLevelId: z.coerce.number().optional(),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const post = await getPostById(client, { postId: parsedData.postId });
  const replies = await getReplies(client, { postId: parsedData.postId });
  return { post, replies };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { reply, topLevelId } = parsedData;
  await createReply(client, { postId: params.postId, userId, reply, topLevelId }); // Remix에서는 Form을 통해 action을 호출하면 자동으로 loader가 다시 호출된다.
  return { success: true };
};

export default function Post({ loaderData, actionData }: Route.ComponentProps) {
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData && 'success' in actionData && actionData.success) {
      formRef.current?.reset();
    }
  }, [actionData]);
  return (
    <div className='space-y-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community'>Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${loaderData.post.post_id}`}>{loaderData.post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='flex w-full items-start gap-10'>
            <Button variant='outline' className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{loaderData.post.upvotes}</span>
            </Button>
            <div className='space-y-20 w-full'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>{loaderData.post.title}</h2>
                <div className='flex items-center gap-2.5 text-sm leading-tight text-muted-foreground'>
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className='size-5' />
                  <span>{DateTime.fromISO(loaderData.post.created_at).toRelative()}</span>
                  <DotIcon className='size-5' />
                  <span>{loaderData.post.replies} replies</span>
                </div>
                <p className='text-sm w-3/4 text-muted-foreground'>{loaderData.post.content}</p>
              </div>
              {isLoggedIn && (
                <Form ref={formRef} className='flex items-start gap-5 w-3/4' method='post'>
                  <Avatar className='size-14'>
                    {avatar && <AvatarImage src={avatar} alt={name} />}
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col gap-5 items-end w-full'>
                    <Textarea
                      placeholder='Add a reply...'
                      className='w-full resize-none'
                      rows={10}
                      name='reply'
                      required
                    />
                    {actionData && 'fieldErrors' in actionData && (
                      <p className='text-red-500'>{actionData.fieldErrors?.reply?.join(', ')}</p>
                    )}
                    <Button type='submit'>Reply</Button>
                  </div>
                </Form>
              )}
              <div className='space-y-10'>
                <h4 className='text-lg font-semibold'>{loaderData.post.replies} Replies</h4>
                <div className='flex flex-col gap-5'>
                  {loaderData.replies.map((reply) => (
                    <Reply
                      key={reply.post_reply_id}
                      id={reply.post_reply_id}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      postedAt={reply.created_at}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className='col-span-2 space-y-5 p-6 border rounded-lg shadow-sm'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              {loaderData.post.author_avatar && <AvatarImage src={loaderData.post.author_avatar} />}
              <AvatarFallback>
                {loaderData.post.author_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-bold'>{loaderData.post.author_name}</h4>
              <Badge variant='secondary' className='capitalize items-start'>
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className='text-sm flex flex-col gap-2'>
            <span>
              🎂 Joined {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}
            </span>
            <span>🚀 Launched {loaderData.post.products} products</span>
          </div>
          <Button variant='outline' className='w-full'>
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
