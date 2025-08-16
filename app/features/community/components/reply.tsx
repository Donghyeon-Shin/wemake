import { DotIcon, MessageCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Form, Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Textarea } from '~/common/components/ui/textarea';

interface ReplyProps {
  id: string;
  username: string;
  avatarUrl: string;
  content: string;
  postedAt: string;
  topLevel: boolean;
}

export function Reply({ id, username, avatarUrl, content, postedAt, topLevel }: ReplyProps) {
  const [replaying, setReplaying] = useState(false);

  const toggleReplaying = () => {
    setReplaying(!replaying);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-5'>
        <Avatar className='size-14'>
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-4 items-start w-2/3'>
          <div className='flex gap-2 items-center'>
            <Link to={`/users/@${username}`} className='font-semibold'>
              <h4 className='font-medium'>{username}</h4>
            </Link>
            <DotIcon className='size-5' />
            <span className='text-xs text-muted-foreground'>{postedAt}</span>
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
      {topLevel && (
        <div className='pl-20 w-full'>
          <Reply
            id='reply-2'
            username='nicolas'
            avatarUrl='https://github.com/shadcn.png'
            content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
            postedAt='12 hours ago'
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
