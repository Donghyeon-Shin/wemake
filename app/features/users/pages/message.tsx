import { SendIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Form, useOutletContext } from 'react-router';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Textarea } from '~/common/components/ui/textarea';
import { BrowserClient, makeSSRClient, type Database } from '~/supa-client';
import { MessageBubble } from '../components/MessageBubble';
import { sendMessage } from '../mutations';
import { getLoggedInUserId, getMessagesByMessageRoomId, getRoomsParticipant } from '../queries';
import type { Route } from './+types/message';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Message | wemake' }];
};

const formSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data: parsedData, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: z.flattenError(error).fieldErrors };
  }
  const { content } = parsedData;
  await sendMessage(client, {
    messageRoomId: Number(params.messageRoomId),
    senderId: userId,
    content: content,
  });
  return { success: true };
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessageRoomId(client, {
    messageRoomId: Number(params.messageRoomId),
    userId: userId,
  });
  const participant = await getRoomsParticipant(client, {
    messageRoomId: Number(params.messageRoomId),
    userId: userId,
  });
  return { messages, participant };
};

export default function Message({ loaderData, actionData }: Route.ComponentProps) {
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, name, avatar } = useOutletContext<{
    userId: string;
    name: string;
    avatar: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData && 'success' in actionData && actionData.success) {
      formRef.current?.reset();
    }
  }, [actionData]);

  useEffect(() => {
    const changes = BrowserClient.channel(`room:${userId}-${loaderData.participant?.profile_id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as Database['public']['Tables']['messages']['Row'],
          ]);
        },
      )
      .subscribe();
    return () => {
      changes.unsubscribe();
    };
  }, [userId, loaderData.participant?.profile_id]);
  return (
    <div className='h-full flex flex-col justify-between'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Avatar className='size-14'>
            <AvatarImage src={loaderData.participant?.profiles?.avatar ?? undefined} />
            <AvatarFallback>{loaderData.participant?.profiles.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0'>
            <CardTitle>{loaderData.participant?.profiles.name ?? undefined}</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='py-10 overflow-y-auto space-y-4 flex flex-col justify-start h-full'>
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarSrc={
              message.sender_id === userId
                ? avatar
                : (loaderData.participant?.profiles?.avatar ?? undefined)
            }
            avatarFallback={
              message.sender_id === userId
                ? name.charAt(0)
                : (loaderData.participant?.profiles?.name.charAt(0) ?? '')
            }
            content={message.content}
            timestamp={message.created_at}
            isOwnMessage={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form ref={formRef} method='post' className='relative flex justify-end items-center'>
            <Textarea
              name='content'
              placeholder='Write your message here...'
              className='resize-none'
              rows={2}
              required
            />
            <Button type='submit' size='icon' className='absolute right-2'>
              <SendIcon className='size-4' />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}

// form을 제출해도 페이지를 다시 로드하지 않도록 설정
export const shouldRevalidate = () => {
  return false;
};
