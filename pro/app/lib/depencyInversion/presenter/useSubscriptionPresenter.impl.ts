import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { retrieveSubscriptionQueryOption } from '../../../features/gli/Subscriptions/retrieveSubscription/retrieveSubscriptionQueryOption';
import { GLICreationResponse } from '../../../features/gli/Subscriptions/model/GLICreationResponse';

export type UseSubscriptionPresenter = () => {
  subscription: GLICreationResponse | undefined;
  isLoadingSubscription: boolean;
};
export function createUseSubscriptionPresenterImpl(): UseSubscriptionPresenter {
  return () => {
    const dispatch = useDispatch();
    const option = retrieveSubscriptionQueryOption({ data: {}, params: {} }, dispatch);
    const { data, isLoading } = useQuery(option);
    return { subscription: data, isLoadingSubscription: isLoading };
  };
}

