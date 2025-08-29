import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { CtxregisterModifyTenant, registerModifyTenantUsecase } from './registerModifyTenant.usecase';

export const registerModifyTenantMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['registerModifyTenant'],
    mutationFn: async (ctx: CtxregisterModifyTenant) => {
      return await dispatch?.(registerModifyTenantUsecase(ctx) as any).unwrap();
    },
  });
