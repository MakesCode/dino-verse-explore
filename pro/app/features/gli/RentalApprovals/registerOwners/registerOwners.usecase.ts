import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';
import { Owner } from '../model/request';

export interface CtxregisterOwners {
  params: {
    subscriptionId: string;
    rentalApprovalId: string;
  };
  data: {
    owners: Owner[];
  };
}
export const registerOwnersUsecase = createAppAsyncThunk(
  'rentalApprovals/registerOwnersUsecase',
  async (ctx: CtxregisterOwners, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      const data = await rentalApprovalApi.putOwners(ctx);
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
