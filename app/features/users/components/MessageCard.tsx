import { Link, useLocation } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { SidebarMenuButton, SidebarMenuItem } from '~/common/components/ui/sidebar';

interface MessageCardProps {
  id: string;
  avatarSrc?: string;
  avatarFallback: string;
  name: string;
  email: string;
}

export function MessageCard({ id, avatarSrc, avatarFallback, name, email }: MessageCardProps) {
  const location = useLocation();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className='h-18'
        asChild
        isActive={location.pathname === `/my/messages/${id}`}
      >
        <Link to={`my/messages/${id}`}>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>{name}</p>
              <p className='text-xs text-muted-foreground'>{email}</p>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
