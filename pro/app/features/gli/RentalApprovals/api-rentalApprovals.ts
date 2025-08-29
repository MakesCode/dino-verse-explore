import { ApiService } from '../../../lib/axios/ApiService';
import { SmartGarantGrid, SmartGarantResponse } from '../../common/model/SmartGarantResponse';
import { RentalApproval } from './model/RentalApproval';
import {
  getRentalApprovalsRequest,
  postInitRequest,
} from './model/request';

export interface RentalApprovalsGateway {
  postInit({ params, data }: postInitRequest): Promise<SmartGarantResponse<RentalApproval>>;
  getRentalApprovals({ params, data }: getRentalApprovalsRequest): Promise<SmartGarantResponse<SmartGarantGrid<RentalApproval>>>;

}

export class ApiRentalApprovalsGateway implements RentalApprovalsGateway {
  constructor(private apiService: ApiService) {}

  async postInit({ params, data }: postInitRequest): Promise<SmartGarantResponse<RentalApproval>> {
    return this.apiService.post(`/v1/gli/subscriptions/${params.subscriptionId}/rental-approvals/init`, data);
  }
  async getRentalApprovals({ params }: getRentalApprovalsRequest): Promise<SmartGarantResponse<SmartGarantGrid<RentalApproval>>> {
    const { subscriptionId, search, pageIndex, limite, status, groupe } = params;

    const query = new URLSearchParams({
      q: search ?? '',
      p: pageIndex.toString() ?? '',
      l: limite.toString() ?? '',
      st: groupe?.toString() ?? '',
      sst: status?.toString() ?? '',
    });
    return this.apiService.get(`/V1/gli/subscriptions/${subscriptionId}/rental-approvals?${query.toString()}`);
  }
 
}
