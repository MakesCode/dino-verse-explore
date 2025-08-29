import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient } from '@tanstack/react-query';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import { NotFound } from './components/NotFound';
import { setCookieSetting } from './lib/tanstack-start/setCookieSetting';
import { createDependencies, createStoreWithDependencies } from './lib/redux/dependencies';

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.

export function createRouter() {
  setCookieSetting();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 0,
        retry: 0,
      },
    },
  });
  const dependencies = createDependencies(queryClient);
  const preloadedState = undefined;

  const store = createStoreWithDependencies(dependencies, preloadedState);
  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, dependencies, store },
      defaultPreload: 'intent',
      scrollRestoration: true,
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      defaultPendingComponent: () => (
        <div className="p-4">
          <div>Chargement...</div>
        </div>
      ),
    }),
    queryClient,
  );
}
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
  interface RouterContext {
    dependencies: ReturnType<typeof createDependencies>;
  }
}
