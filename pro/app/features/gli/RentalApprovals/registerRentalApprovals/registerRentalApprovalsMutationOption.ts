import { mutationOptions } from '../../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../../lib/redux/type';
import { CtxregisterRentalApprovals, registerRentalApprovalsUsecase } from './registerRentalApprovals.usecase';

export const registerRentalApprovalsMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['registerRentalApprovals'],
    mutationFn: async (ctx: CtxregisterRentalApprovals) => {
      return await dispatch?.(registerRentalApprovalsUsecase(ctx) as any).unwrap();
    },
  });
