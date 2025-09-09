import { useEffect, useState } from 'react';
import MockSubscriptionGateway from '../api/api-subscription';

export function createUseKpiPresenterMock() {
  const gateway = new MockSubscriptionGateway();
  function useKpiPresenter({ subscriptionId }: { subscriptionId?: string }) {
    const [kpi, setKpi] = useState<any>();
    const [isLoadingKpi, setLoading] = useState(true);
    useEffect(() => {
      if (!subscriptionId) return;
      let mounted = true;
      setLoading(true);
      gateway
        .getKpi({ params: { subscriptionId }, data: {} } as any)
        .then((res: any) => mounted && setKpi(res.payload))
        .finally(() => mounted && setLoading(false));
      return () => {
        mounted = false;
      };
    }, [subscriptionId]);
    return { kpi, isLoadingKpi };
  }
  return useKpiPresenter;
}

