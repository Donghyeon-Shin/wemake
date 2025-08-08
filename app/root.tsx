import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import Navigation from './common/components/layout/navigation';

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
        {children} {/* 각 페이지의 내용 */}
        <ScrollRestoration /> {/* 스크롤이 유지되는 기능 */}
        <Scripts /> {/* JavaScript로 변환 */}
      </body>
    </html>
  );
}

// 각 페이지의 내용
export default function App() {
  return (
    <div className='py-28'>
      <Navigation isLoggedIn={true} hasNotifications={true} hasMessages={true} />
      <Outlet />
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
