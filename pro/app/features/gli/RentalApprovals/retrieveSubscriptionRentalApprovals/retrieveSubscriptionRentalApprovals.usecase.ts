import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';

export interface CtxretrieveSubscriptionRentalApprovals {
  params: {
    rentalApprovalId: string;
    subscriptionId: string;
  };
  data: {};
}
export const retrieveSubscriptionRentalApprovalsUsecase = createAppAsyncThunk(
  'rentalApprovals/retrieveSubscriptionRentalApprovalsUsecase',
  async (ctx: CtxretrieveSubscriptionRentalApprovals, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      const data = await rentalApprovalApi.getSubscriptionRentalApprovals({
        data: {},
        params: {
          rentalApprovalId: ctx.params.rentalApprovalId,
          subscriptionId: ctx.params.subscriptionId,
        },
      });
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);
