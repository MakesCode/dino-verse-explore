import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { retrieveKpiQueryOption } from '../../../features/gli/Subscriptions/retrieveKpi/retrieveKpiQueryOption';
import { Kpi } from '../../../features/gli/Subscriptions/model/kpi';

export type UseKpiPresenter = (ctx: { subscriptionId?: string }) => {
  kpi: Kpi | undefined;
  isLoadingKpi: boolean;
};
export function createUseKpiPresenterImpl(): UseKpiPresenter {
  return ({ subscriptionId }) => {
    const dispatch = useDispatch();
    const option = retrieveKpiQueryOption(
      {
        data: {},
        params: { subscriptionId: subscriptionId || '' },
      },
      dispatch,
    );
    const { data, isLoading } = useQuery(option);
    return { kpi: data, isLoadingKpi: isLoading };
  };
}

