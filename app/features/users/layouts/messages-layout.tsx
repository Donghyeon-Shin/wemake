import { Outlet } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from '~/common/components/ui/sidebar';
import { MessageCard } from '../components/MessageCard';

export default function MessagesLayout() {
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] overflow-hidden h-full min-h-full'>
      <Sidebar className='pt-16' variant='floating'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessageCard
                  id={index.toString()}
                  avatarSrc='https://github.com/shadcn.png'
                  avatarFallback='CN'
                  name='John Doe'
                  email='john.doe@example.com'
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
