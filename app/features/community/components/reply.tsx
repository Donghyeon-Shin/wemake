import { DotIcon, MessageCircleIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Form, Link, useActionData, useOutletContext } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Textarea } from '~/common/components/ui/textarea';
import type { action } from '../pages/post';

interface ReplyProps {
  id: number;
  name: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  postedAt: string;
  topLevel: boolean;
  topLevelId: number;
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
  name,
  username,
  avatarUrl,
  content,
  postedAt,
  topLevel,
  topLevelId,
  replies,
}: ReplyProps) {
  const actionData = useActionData<typeof action>(); // post 페이지의 action 함수 데이터
  const [replaying, setReplaying] = useState(false);
  const {
    isLoggedIn,
    name: loggedInName,
    avatar,
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    username: string;
    avatar: string;
  }>();

  const toggleReplaying = () => {
    setReplaying(!replaying);
  };

  useEffect(() => {
    if (actionData && 'success' in actionData && actionData.success) {
      setReplaying(false);
    }
  }, [actionData]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex items-center gap-5 w-2/3'>
        <Avatar className='size-14'>
          {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-4 items-start w-full'>
          <div className='flex gap-2 items-center'>
            <Link to={`/users/@${username}`} className='font-semibold'>
              <h4 className='font-medium'>{name}</h4>
            </Link>
            <DotIcon className='size-5' />
            <span className='text-xs text-muted-foreground'>
              {DateTime.fromISO(postedAt).toRelative()}
            </span>
          </div>
          <p className='text-sm text-muted-foreground'>{content}</p>
          {isLoggedIn && (
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
          )}
        </div>
      </div>
      {replaying && (
        <Form className='flex items-start gap-5 w-3/4' method='post'>
          <input type='hidden' name='topLevelId' value={topLevelId} /> {/* 대댓글 참조 정보 전달 */}
          <Avatar className='size-14'>
            {avatar && <AvatarImage src={avatar} alt={loggedInName} />}
            <AvatarFallback>{loggedInName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-5 items-end w-full'>
            <Textarea
              placeholder='Add a reply...'
              className='w-full resize-none'
              rows={10}
              name='reply'
              defaultValue={`@${username} `}
              required
            />
            <Button type='submit'>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className='pl-20 w-full'>
          {replies.map((reply) => (
            <Reply
              id={reply.post_reply_id}
              name={reply.user.name}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              postedAt={reply.created_at}
              topLevel={false}
              topLevelId={topLevelId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
