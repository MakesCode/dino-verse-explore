import React from 'react';
import { useFiltres, type UseFiltresParams, type UseFiltresReturn } from '../../routes/(gli)/(home)/-components/useFiltres';
import { useDebounce as useDebounceDefault } from '../../routes/(gli)/(home)/-components/useDebounce';
import { createUseSubscriptionPresenterImpl, UseSubscriptionPresenter } from './presenter/useSubscriptionPresenter.impl';
import { createUseKpiPresenterImpl, UseKpiPresenter } from './presenter/useKpiPresenter.impl';
import { createUseRentalApprovalsPresenterImpl, UseRentalApprovalsPresenter } from './presenter/useRentalApprovalsPresenter.impl';

export type UseDebounceHook = <T>(value: T, delay: number) => T;
export type UseFiltresHook = (params?: UseFiltresParams) => UseFiltresReturn;

export type Dependencies = {
  useSubscriptionPresenter?: UseSubscriptionPresenter;
  useKpiPresenter?: UseKpiPresenter;
  useRentalApprovalsPresenter?: UseRentalApprovalsPresenter;
  useDebounceHook?: UseDebounceHook;
  useFiltresHook?: UseFiltresHook;
};

const DependenciesContext = React.createContext<Required<Dependencies>>({
  useSubscriptionPresenter: createUseSubscriptionPresenterImpl(),
  useKpiPresenter: createUseKpiPresenterImpl(),
  useRentalApprovalsPresenter: createUseRentalApprovalsPresenterImpl({ useFiltresHook: useFiltres }),
  useDebounceHook: useDebounceDefault,
  useFiltresHook: useFiltres,
});

export const DependenciesProvider: React.FC<{
  dependencies?: Dependencies;
  children: React.ReactNode;
}> = ({ dependencies, children }) => {
  const value = React.useMemo(() => {
    const resolvedUseFiltresHook = dependencies?.useFiltresHook ?? useFiltres;
    const resolvedUseDebounceHook = dependencies?.useDebounceHook ?? useDebounceDefault;
    const resolvedUseSubscriptionPresenter =
      dependencies?.useSubscriptionPresenter ?? createUseSubscriptionPresenterImpl();
    const resolvedUseKpiPresenter = dependencies?.useKpiPresenter ?? createUseKpiPresenterImpl();
    const resolvedUseRentalApprovalsPresenter =
      dependencies?.useRentalApprovalsPresenter ??
      createUseRentalApprovalsPresenterImpl({ useFiltresHook: resolvedUseFiltresHook });

    return {
      useSubscriptionPresenter: resolvedUseSubscriptionPresenter,
      useKpiPresenter: resolvedUseKpiPresenter,
      useRentalApprovalsPresenter: resolvedUseRentalApprovalsPresenter,
      useDebounceHook: resolvedUseDebounceHook,
      useFiltresHook: resolvedUseFiltresHook,
    } as Required<Dependencies>;
  }, [dependencies]);
  return <DependenciesContext.Provider value={value}>{children}</DependenciesContext.Provider>;
};

export const useDependencies = () => React.useContext(DependenciesContext);
