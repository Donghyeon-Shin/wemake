import { DotIcon, MessageCircleIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Form, Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Textarea } from '~/common/components/ui/textarea';

interface ReplyProps {
  id: number;
  username: string;
  avatarUrl: string | null;
  content: string;
  postedAt: string;
  topLevel: boolean;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export function Reply({
  id,
  username,
  avatarUrl,
  content,
  postedAt,
  topLevel,
  replies,
}: ReplyProps) {
  const [replaying, setReplaying] = useState(false);

  const toggleReplaying = () => {
    setReplaying(!replaying);
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex items-center gap-5 w-2/3'>
        <Avatar className='size-14'>
          {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-4 items-start w-full'>
          <div className='flex gap-2 items-center'>
            <Link to={`/users/@${username}`} className='font-semibold'>
              <h4 className='font-medium'>{username}</h4>
            </Link>
            <DotIcon className='size-5' />
            <span className='text-xs text-muted-foreground'>
              {DateTime.fromISO(postedAt).toRelative()}
            </span>
          </div>
          <p className='text-sm text-muted-foreground'>{content}</p>
          <Button
            variant='ghost'
            className='self-end'
            onClick={() => {
              toggleReplaying();
            }}
          >
            <MessageCircleIcon className='size-4' />
            Reply
          </Button>
        </div>
      </div>
      {replaying && (
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
      )}
      {topLevel && replies && (
        <div className='pl-20 w-full'>
          {replies.map((reply) => (
            <Reply
              id={reply.post_reply_id}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              postedAt={reply.created_at}
              topLevel={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
