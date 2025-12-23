import { SendIcon } from 'lucide-react';
import { Form, useOutletContext } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Textarea } from '~/common/components/ui/textarea';
import { makeSSRClient } from '~/supa-client';
import { MessageBubble } from '../components/MessageBubble';
import { getLoggedInUserId, getMessagesByMessageRoomId, getRoomsParticipant } from '../queries';
import type { Route } from './+types/message';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Message | wemake' }];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessageRoomId(client, {
    messageRoomId: Number(params.messageRoomId),
    userId: userId,
  });
  const participants = await getRoomsParticipant(client, {
    messageRoomId: Number(params.messageRoomId),
    userId: userId,
  });
  return { messages, participants };
};

export default function Message({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <div className='h-full flex flex-col justify-between'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Avatar className='size-14'>
            <AvatarImage src={loaderData.participants?.profiles?.avatar ?? undefined} />
            <AvatarFallback>{loaderData.participants?.profiles.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0'>
            <CardTitle>{loaderData.participants?.profiles.name ?? undefined}</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='py-10 overflow-y-auto space-y-4 flex flex-col justify-start h-full'>
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarSrc={message.sender.avatar ?? undefined}
            avatarFallback={message.sender.name.charAt(0)}
            content={message.content}
            timestamp={message.created_at}
            isOwnMessage={message.sender_id === userId}
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
