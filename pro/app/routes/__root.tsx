import { HeadContent, Outlet, createRootRouteWithContext, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import appCss from '../lib/style/app.css?url';
import themecss from '../lib/style/mila-theme.css?url';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
// import logo from '@sg/assets/img/favicon.ico?url';
import { Provider } from 'react-redux';
import { Provider as DIPresenterProvider } from '../lib/depencyInversion/Provider';
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary';
import { NotFound } from '../components/NotFound';
import { createStoreWithDependencies, Dependencies } from '../lib/redux/dependencies';
import {SidebarProvider} from '../../../packages/component/ui/sidebar';
const TanStackRouterDevtools = process.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  dependencies: Dependencies;
  store: ReturnType<typeof createStoreWithDependencies>;
  user?: {
    housingId: string;
    applicationId: string;
    exp: number;
    isAuth: boolean;
  };
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'SmartGarant',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: themecss,
      },
      { rel: 'icon', type: 'image/x-icon', href: "" },
    ],
  }),

  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
  beforeLoad: async (ctx) => {

  },
});

function RootComponent() {
  const { store } = Route.useRouteContext();

  return (
    <RootDocument>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
          <Provider store={store}>
            <DIPresenterProvider>
              <Outlet />
              <NotificationProvider />
            </DIPresenterProvider>
          </Provider>
      </SidebarProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="">
        {children}
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
import { useState, useEffect } from 'react';
import { NotificationProvider } from '../lib/notification/NotificationProvider';
import { getCookieIsomorphic } from '../lib/tanstack-start/getCookieIsomorphic';
import { I18N_KEY_COOKIE_NAME } from '../lib/constants';

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isAppLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
