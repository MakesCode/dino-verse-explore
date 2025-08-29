import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { CtxregisterTenant, registerTenantUsecase } from './registerTenant.usecase';

export const registerTenantMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['registerTenant'],
    mutationFn: async (ctx: CtxregisterTenant) => {
      return await dispatch?.(registerTenantUsecase(ctx) as any).unwrap();
    },
  });
