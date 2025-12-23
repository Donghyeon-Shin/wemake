import { Outlet, useOutletContext } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from '~/common/components/ui/sidebar';
import { makeSSRClient } from '~/supa-client';
import { MessageCard } from '../components/MessageCard';
import { getLoggedInUserId, getMessages } from '../queries';
import type { Route } from './+types/messages-layout';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, { userId });
  return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full'>
      <Sidebar className='pt-16' variant='floating'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message) => (
                <MessageCard
                  key={message.message_room_id.toString()}
                  id={message.message_room_id.toString()}
                  avatarSrc={message.avatar}
                  avatarFallback={message.name.charAt(0)}
                  name={message.name}
                  lastMessage={message.last_message ?? ''}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='w-full h-full'>
        <Outlet context={{ userId }} />
      </div>
    </SidebarProvider>
  );
}
