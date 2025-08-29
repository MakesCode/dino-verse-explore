import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';

export interface Ctxinit {
  params: {
    subscriptionId: string;
  };
  data: {};
}
export const initUsecase = createAppAsyncThunk('rentalApprovals/initUsecase', async (ctx: Ctxinit, { dispatch, extra }) => {
  const { rentalApprovalApi } = extra as Dependencies;

  try {
    const data = await rentalApprovalApi.postInit({
      data: {},
      params: {
        subscriptionId: ctx.params.subscriptionId,
      },
    });
    return data.payload;
  } catch (error) {
    dispatch(
      notificationAdded({
        typeMessage: TypeNotifyMessage.errorApi,
      }),
    );
    throw error;
  }
});
