import { ChevronUpIcon, DotIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { data, Form, Link } from 'react-router';
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
import { Reply } from '../components/reply';
import { getPostById, getReplies } from '../queries';
import type { Route } from './+types/post';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Post | wemake' }];
};

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 });
  }
  const post = await getPostById({ postId: parsedData.postId });
  const replies = await getReplies({ postId: parsedData.postId });
  return { post, replies };
};

export default function Post({ loaderData }: Route.ComponentProps) {
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
              <Form className='flex items-start gap-5 w-3/4'>
                <Avatar className='size-14'>
                  <AvatarImage src='https://github.com/shadcn.png' alt='John Doe' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-5 items-end w-full'>
                  <Textarea placeholder='Add a reply...' className='w-full resize-none' rows={10} />
                  <Button type='submit'>Reply</Button>
                </div>
              </Form>
              <div className='space-y-10'>
                <h4 className='text-lg font-semibold'>{loaderData.post.replies} Replies</h4>
                <div className='flex flex-col gap-5'>
                  {loaderData.replies.map((reply) => (
                    <Reply
                      key={reply.post_reply_id}
                      id={reply.post_reply_id}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      postedAt={reply.created_at}
                      topLevel={true}
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
