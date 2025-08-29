import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { CtxregisterOwners, registerOwnersUsecase } from './registerOwners.usecase';

export const registerOwnersMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['registerOwner'],
    mutationFn: async (ctx: CtxregisterOwners) => {
      return await dispatch?.(registerOwnersUsecase(ctx) as any).unwrap();
    },
  });
