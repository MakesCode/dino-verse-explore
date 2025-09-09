import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MockSubscriptionGateway from '../api/api-subscription';

export function createUseKpiPresenterMock() {
  function useKpiPresenter({ subscriptionId }: { subscriptionId?: string }) {
    const gateway = useMemo(() => new MockSubscriptionGateway(), []);
    const { data, isLoading } = useQuery({
      queryKey: ['mock', 'kpi', subscriptionId],
      enabled: !!subscriptionId,
      queryFn: () => gateway.getKpi({ params: { subscriptionId: subscriptionId! }, data: {} } as any),
      select: (res: any) => res.payload,
    });
    return { kpi: data, isLoadingKpi: isLoading };
  }
  return useKpiPresenter;
}
