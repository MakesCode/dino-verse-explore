import { useEffect, useState } from 'react';
import MockSubscriptionGateway from '../api/api-subscription';

export function createUseSubscriptionPresenterMock() {
  const gateway = new MockSubscriptionGateway();
  function useSubscriptionPresenter() {
    const [subscription, setSubscription] = useState<any>();
    const [isLoadingSubscription, setLoading] = useState(true);
    useEffect(() => {
      let mounted = true;
      setLoading(true);
      gateway
        .getSubscription({ params: {}, data: {} } as any)
        .then((res: any) => mounted && setSubscription(res.payload))
        .finally(() => mounted && setLoading(false));
      return () => {
        mounted = false;
      };
    }, []);
    return { subscription, isLoadingSubscription };
  }
  return useSubscriptionPresenter;
}

