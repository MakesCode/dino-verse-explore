import { QueryClient } from '@tanstack/react-query';
import { createAppStore } from './createAppStore';
import { ApiService } from '../axios/ApiService';
import { SESSION_COOKIE_NAME } from '../constants';
import { getSetting } from '../tanstack-start/getSetting';
import { ApiSubscriptionGateway } from '../../features/gli/Subscriptions/api-subscription';
import { ApiRentalApprovalsGateway, RentalApprovalsGateway } from '../../features/gli/RentalApprovals/api-rentalApprovals';

export interface Dependencies {
  subscriptionApi: ApiSubscriptionGateway;
  rentalApprovalApi: RentalApprovalsGateway;
  queryClient: QueryClient;
  apiService: ApiService;
}

export function createDependencies(queryClient: QueryClient): Dependencies {
  const setting = getSetting();
  const baseURL = setting.VITE_SMART_GARANT_URL;

  const apiService = new ApiService({
    baseURL,
    tokenName: SESSION_COOKIE_NAME,
  });
  const subscriptionApi = new ApiSubscriptionGateway(apiService);
  const rentalApprovalApi = new ApiRentalApprovalsGateway(apiService);
  return {
    apiService,
    queryClient,
    subscriptionApi,
    rentalApprovalApi,
  };
}

export function createStoreWithDependencies(dependencies: Dependencies, preloadedState) {
  return createAppStore(dependencies, preloadedState);
}
