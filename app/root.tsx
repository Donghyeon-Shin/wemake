import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from 'react-router';

import { Settings } from 'luxon';
import type { Route } from './+types/root';
import './app.css';
import Navigation from './common/components/layout/navigation';
import { countNotifications, getUserByProfileId } from './features/users/queries';
import { cn } from './lib/utils';
import { makeSSRClient } from './supa-client';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = 'ko';
  Settings.defaultZone = 'Asia/Seoul';
  return (
    <html lang='en' className='dark'>
      <head>
        {[
          <meta charSet='utf-8' key='charset' />,
          <meta name='viewport' content='width=device-width, initial-scale=1' key='viewport' />,
          <Meta key='meta' />,
          <Links key='links' />,
        ]}
      </head>
      <body>
        <main>
          {children} {/* 각 페이지의 내용 */}
        </main>
        <ScrollRestoration /> {/* 스크롤이 유지되는 기능 */}
        <Scripts /> {/* JavaScript로 변환 */}
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request); // 유저 정보를 Load하거나 Database의 RLS(Row Level Security)을 위해서 필요
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserByProfileId(client, { profileId: user?.id });
    const count = await countNotifications(client, { userId: user?.id });
    return { user, profile, count };
  }
  return { user: null, profile: null, count: 0 };
};

// 각 페이지의 내용
export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isLoggedIn = !!loaderData.user;
  return (
    <div
      className={cn(
        !pathname.includes('/auth/') && 'py-28 px-5 lg:px-20',
        isLoading && 'transition-opacity animate-pulse',
      )}
    >
      {pathname.includes('/auth') ? null : (
        <Navigation
          isLoggedIn={isLoggedIn}
          name={loaderData.profile?.name}
          username={loaderData.profile?.username}
          avatar={loaderData.profile?.avatar}
          hasNotifications={loaderData.count > 0}
          hasMessages={true}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
          name: loaderData.profile?.name,
          username: loaderData.profile?.username,
          avatar: loaderData.profile?.avatar,
          userId: loaderData.user?.id,
        }}
      />
    </div>
  );
}

// 에러 발생 시 표시되는 화면
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
