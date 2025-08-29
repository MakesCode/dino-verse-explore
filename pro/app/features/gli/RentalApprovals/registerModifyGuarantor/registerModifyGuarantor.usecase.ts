import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';
import { putUpdateGuarantorRequest } from '../model/request';

export interface CtxregisterModifyGuarantor {
  params: putUpdateGuarantorRequest['params'];
  data: putUpdateGuarantorRequest['data'];
}
export const registerModifyGuarantorUsecase = createAppAsyncThunk(
  'rentalApproval/registerModifyGuarantorUsecase',
  async (ctx: CtxregisterModifyGuarantor, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      await rentalApprovalApi.putUpdateGuarantor({
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
