import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { TypeNotifyMessage } from '../../../common/notify/model/typeMessage';
import { notificationAdded } from '../../../common/notify/notify.action';

export interface CtxregisterProperty {
  params: {
    subscriptionId: string;
    rentalApprovalId: string;
  };
  data: {
    realEstateLot: {
      address: {
        address: string;
        city: string;
        country: string;
        zipCode: string;
        fullAddress: string;
        isManual: boolean;
      };
      type: number;
      surface: number;
      roomsNumber: number;
      floor: number;
    };
  };
}

export const registerPropertyUsecase = createAppAsyncThunk(
  'rentalApprovals/registerPropertyUsecase',
  async (ctx: CtxregisterProperty, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      await rentalApprovalApi.putRealEstateLots({
        data: ctx.data,
        params: ctx.params,
      });
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
