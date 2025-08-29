import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';
import { putRentalApprovalsRequest } from '../model/request';

export interface CtxregisterRentalApprovals {
  params: putRentalApprovalsRequest['params'];
  data: putRentalApprovalsRequest['data'];
}
export const registerRentalApprovalsUsecase = createAppAsyncThunk(
  'rentalApprovals/registerRentalApprovalsUsecase',
  async (ctx: CtxregisterRentalApprovals, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      const data = await rentalApprovalApi.putRentalApprovals(ctx);
      return data.payload;
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
