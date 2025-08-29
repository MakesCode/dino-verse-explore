import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';
import { putTenantRequest } from '../model/request';

export interface CtxregisterTenant {
  params: {
    subscriptionId: string;
    rentalApprovalId: string;
  };
  data: putTenantRequest['data'];
}
export const registerTenantUsecase = createAppAsyncThunk(
  'rentalApprovals/registerTenantUsecase',
  async (ctx: CtxregisterTenant, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      await rentalApprovalApi.putTenant({
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
