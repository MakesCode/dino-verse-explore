import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { CtxregisterProperty, registerPropertyUsecase } from './registerProperty.usecase';

export const registerPropertyMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['registerProperty'],
    mutationFn: async (ctx: CtxregisterProperty) => {
      return await dispatch?.(registerPropertyUsecase(ctx) as any).unwrap();
    },
  });
