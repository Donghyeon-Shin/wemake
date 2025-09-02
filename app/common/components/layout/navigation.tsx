import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/common/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/common/components/ui/navigation-menu';
import { Separator } from '~/common/components/ui/separator';
import { cn } from '~/lib/utils';

const menus: {
  name: string;
  to: string;
  items?: {
    name: string;
    description: string;
    to: string;
  }[];
}[] = [
  {
    name: 'Product',
    to: '/products',
    items: [
      {
        name: 'Leaderboards',
        description: 'See the top performers in your community',
        to: '/products/leaderboards',
      },
      {
        name: 'Categories',
        description: 'See the top categories in your community',
        to: '/products/categories',
      },
      {
        name: 'Search',
        description: 'Search for products',
        to: '/products/search',
      },
      {
        name: 'Submit a Product',
        description: 'Submit a product to our community',
        to: '/products/submit',
      },
      {
        name: 'Promote',
        description: 'Promote your product to our community',
        to: '/products/promote',
      },
    ],
  },
  {
    name: 'Jobs',
    to: '/jobs',
    items: [
      {
        name: 'Remote Jobs',
        description: 'Find a remote job in our community',
        to: '/jobs?location=remote',
      },
      {
        name: 'Full-Time Jobs',
        description: 'Find a full-time job in our community',
        to: '/jobs?type=full-time',
      },
      {
        name: 'Freelance Jobs',
        description: 'Find a freelance job in our community',
        to: '/jobs?type=freelance',
      },
      {
        name: 'Internships',
        description: 'Find an internship in our community',
        to: '/jobs?type=internship',
      },
      {
        name: 'Submit a Job',
        description: 'Submit a job to our community',
        to: '/jobs/submit',
      },
    ],
  },
  {
    name: 'Community',
    to: '/community',
    items: [
      {
        name: 'All Posts',
        description: 'See all posts in our community',
        to: '/community',
      },
      {
        name: 'Top Posts',
        description: 'See the top posts in our community',
        to: '/community?sort=top',
      },
      {
        name: 'New Posts',
        description: 'See the new posts in our community',
        to: '/community?sort=new',
      },
      {
        name: 'Create a Post',
        description: 'Create a post to our community',
        to: '/community/create',
      },
    ],
  },
  {
    name: 'IdeasGPT',
    to: '/ideas',
  },
  {
    name: 'Teams',
    to: '/teams',
    items: [
      {
        name: 'All Teams',
        description: 'See all teams in our community',
        to: '/teams',
      },
      {
        name: 'Create a Team',
        description: 'Create a team to our community',
        to: '/teams/create',
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  name,
  username,
  avatar,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  name?: string;
  username?: string;
  avatar?: string | null;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  return (
    <nav className='flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50'>
      <div className='flex items-center gap-4'>
        <Link to='/' className='font-bold tracking-tighter text-lg'>
          wemake
        </Link>
        <Separator orientation='vertical' className='h-6 mx-4' />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    {/*
                    prefetch='intent' 네비게이션 메뉴 트리거 Hover 시 미리 로드(Hover 벗어날 때 취소됨)
                    prefetch='viewport' 네비게이션 메뉴 트리거가 viewport에 있을 때 미리 로드
                    prefetch='render' 네비게이션 메뉴 트리거 랜더 시 미리 로드
                    */}
                    <Link to={menu.to} prefetch='intent'>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className='grid w-[600px] font-light gap-3 p-4 grid-cols-2'>
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn(
                              'select-none rounded-md transition-colors focus:bg-accent hover:bg-accent',
                              item.to === '/products/promote' &&
                                'col-span-2 bg-primary/10 hover:bg-primary/20',
                              item.to === '/jobs/submit' &&
                                'col-span-2 bg-primary/10 hover:bg-primary/20',
                            )}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className='p-3 space-y-1 block leading-none no-underline outline-none'
                                to={item.to}
                              >
                                <span className='text-sm font-medium leading-none'>
                                  {item.name}
                                </span>
                                <p className='text-sm leading-snug text-muted-foreground'>
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost' asChild className='relative'>
            <Link to='/my/notifications'>
              <BellIcon className='size-4' />
              {hasNotifications && (
                <span className='absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full' />
              )}
            </Link>
          </Button>
          <Button size='icon' variant='ghost' asChild className='relative'>
            <Link to='/my/messages'>
              <MessageCircleIcon className='size-4' />
              {hasMessages && (
                <span className='absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full' />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                {avatar && <AvatarImage src={avatar} />}
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel className='flex flex-col'>
                <span className='font-semibold'>{name}</span>
                <span className='text-xs text-muted-foreground'>@{username}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/dashboard'>
                    <BarChart3Icon className='size-4 mr-2' />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/profile'>
                    <UserIcon className='size-4 mr-2' />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/settings'>
                    <SettingsIcon className='size-4 mr-2' />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to='/auth/logout'>
                  <LogOutIcon className='size-4 mr-2' />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <Button asChild variant='secondary'>
            <Link to='/auth/login'>Login</Link>
          </Button>
          <Button asChild>
            <Link to='/auth/join'>Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
