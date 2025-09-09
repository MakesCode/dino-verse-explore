import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MockSubscriptionGateway from '../api/api-subscription';

export function createUseSubscriptionPresenterMock() {
  function useSubscriptionPresenter() {
    const gateway = useMemo(() => new MockSubscriptionGateway(), []);
    const { data, isLoading } = useQuery({
      queryKey: ['mock', 'subscription'],
      queryFn: () => gateway.getSubscription({ params: {}, data: {} } as any),
      select: (res: any) => res.payload,
    });
    return { subscription: data, isLoadingSubscription: isLoading };
  }
  return useSubscriptionPresenter;
}
