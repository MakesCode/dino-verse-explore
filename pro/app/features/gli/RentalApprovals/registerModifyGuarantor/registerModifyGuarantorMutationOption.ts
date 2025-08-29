import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { CtxregisterModifyGuarantor, registerModifyGuarantorUsecase } from './registerModifyGuarantor.usecase';

export const registerModifyGuarantorMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['registerModifyGuarantor'],
    mutationFn: async (ctx: CtxregisterModifyGuarantor) => {
      return await dispatch?.(registerModifyGuarantorUsecase(ctx) as any).unwrap();
    },
  });
