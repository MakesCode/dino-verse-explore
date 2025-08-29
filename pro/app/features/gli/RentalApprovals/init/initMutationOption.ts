import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { Ctxinit, initUsecase } from './init.usecase';

export const initMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['init'],
    mutationFn: async (ctx: Ctxinit) => {
      return await dispatch?.(initUsecase(ctx) as any).unwrap();
    },
  });
