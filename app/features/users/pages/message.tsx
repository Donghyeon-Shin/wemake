import { SendIcon } from 'lucide-react';
import { Form } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Textarea } from '~/common/components/ui/textarea';
import { MessageBubble } from '../components/MessageBubble';
import type { Route } from './+types/message';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Message | wemake' }];
};

export default function Message() {
  return (
    <div className='h-full flex flex-col justify-between'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Avatar className='size-14'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0'>
            <CardTitle>Shadcn</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='py-10 overflow-y-auto flex flex-col justify-start h-full'>
        {Array.from({ length: 10 }).map((_, index) => (
          <MessageBubble
            avatarSrc='https://github.com/shadcn.png'
            avatarFallback='CN'
            content="this is a message for steve jobs in the morning, he is a very busy person and he doesn't have time to read this message."
            timestamp='2 hours ago'
            isOwnMessage={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className='relative flex justify-end items-center'>
            <Textarea placeholder='Write your message here...' className='resize-none' rows={1} />
            <Button type='submit' size='icon' className='absolute right-2'>
              <SendIcon className='size-4' />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
