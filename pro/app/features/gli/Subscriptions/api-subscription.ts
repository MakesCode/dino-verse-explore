import { ApiService } from '../../../lib/axios/ApiService';
import { ApiRequest } from '../../../lib/type/type';
import { SmartGarantResponse } from '../../common/model/SmartGarantResponse';
import { GLICreationResponse } from './model/GLICreationResponse';
import { Kpi } from './model/kpi';

export type getSubscriptionRequest = ApiRequest<{}, {}>;
export type getKpiRequest = ApiRequest<
  {
    subscriptionId: string;
  },
  {}
>;

export interface SubscriptionGateway {
  getSubscription({ params, data }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>>;
  getKpi({ params, data }: getKpiRequest): Promise<SmartGarantResponse<Kpi>>;
}

export class ApiSubscriptionGateway implements SubscriptionGateway {
  constructor(private apiService: ApiService) {}

  async getSubscription({ params, data }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>> {
    return this.apiService.get(`/v1/gli/subscription`);
  }
  async getKpi({ params }: getKpiRequest): Promise<SmartGarantResponse<Kpi>> {
    return this.apiService.get(`/v1/gli/subscriptions/${params.subscriptionId}/kpi`);
  }
}
