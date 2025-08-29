import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';
import { putUpdateTenantRequest } from '../model/request';

export interface CtxregisterModifyTenant {
  params: { subscriptionId: string; rentalApprovalId: string; tenantId: string };
  data: putUpdateTenantRequest['data'];
}
export const registerModifyTenantUsecase = createAppAsyncThunk(
  'rentalApprovals/registerModifyTenantUsecase',
  async (ctx: CtxregisterModifyTenant, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      await rentalApprovalApi.putUpdateTenant({
        data: ctx.data,
        params: ctx.params,
      });
      return;
    } catch (error) {
      dispatch(
        notificationAdded({
          typeMessage: TypeNotifyMessage.errorApi,
        }),
      );
      throw error;
    }
  },
);
