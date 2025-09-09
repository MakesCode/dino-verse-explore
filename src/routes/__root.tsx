import { HeadContent, Outlet, createRootRouteWithContext, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Provider as DIPresenterProvider } from '../lib/depencyInversion/Provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import '../index.css';

const TanStackRouterDevtools = process.env.NODE_ENV === 'production'
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
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
        title: 'Dino Verse Explore',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <TooltipProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <DIPresenterProvider>
            <Outlet />
            <Toaster />
            <Sonner />
          </DIPresenterProvider>
        </SidebarProvider>
      </TooltipProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
        {/* <ReactQueryDevtools buttonPosition="bottom-right" /> */}
        <Scripts />
      </body>
    </html>
  );
}
