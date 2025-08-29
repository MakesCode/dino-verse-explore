import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { getEntitiesRequest } from '../model/request';

export interface CtxsearchEntities {
  params: getEntitiesRequest['params'];
  data: getEntitiesRequest['data'];
}
export const searchEntitiesUsecase = createAppAsyncThunk(
  'rentalApprovals/searchEntitiesUsecase',
  async (ctx: CtxsearchEntities, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      const data = await rentalApprovalApi.getEntities(ctx);
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);
