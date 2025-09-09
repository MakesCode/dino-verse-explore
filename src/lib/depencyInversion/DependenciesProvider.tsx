import React from 'react';
import { createUseSubscriptionPresenterMock } from '../../../packages/mock/presenter/useSubscriptionPresenter.mock';
import { createUseKpiPresenterMock } from '../../../packages/mock/presenter/useKpiPresenter.mock';
import { createUseRentalApprovalsPresenterMock } from '../../../packages/mock/presenter/useRentalApprovalsPresenter.mock';

export type UseSubscriptionPresenter = () => { subscription: any | undefined; isLoadingSubscription: boolean };
export type UseKpiPresenter = (ctx: { subscriptionId?: string }) => { kpi: any | undefined; isLoadingKpi: boolean };
export type UseRentalApprovalsPresenter = (ctx: { subscriptionId?: string }) => any;

export type Dependencies = {
  useSubscriptionPresenter?: UseSubscriptionPresenter;
  useKpiPresenter?: UseKpiPresenter;
  useRentalApprovalsPresenter?: UseRentalApprovalsPresenter;
};

const DependenciesContext = React.createContext<Required<Dependencies>>({
  useSubscriptionPresenter: createUseSubscriptionPresenterMock(),
  useKpiPresenter: createUseKpiPresenterMock(),
  useRentalApprovalsPresenter: createUseRentalApprovalsPresenterMock(),
});

export const DependenciesProvider: React.FC<{
  dependencies?: Dependencies;
  children: React.ReactNode;
}> = ({ dependencies, children }) => {
  const value = React.useMemo(() => {
    return {
      useSubscriptionPresenter: dependencies?.useSubscriptionPresenter ?? createUseSubscriptionPresenterMock(),
      useKpiPresenter: dependencies?.useKpiPresenter ?? createUseKpiPresenterMock(),
      useRentalApprovalsPresenter: dependencies?.useRentalApprovalsPresenter ?? createUseRentalApprovalsPresenterMock(),
    } as Required<Dependencies>;
  }, [dependencies]);
  return <DependenciesContext.Provider value={value}>{children}</DependenciesContext.Provider>;
};

export const useDependencies = () => React.useContext(DependenciesContext);
