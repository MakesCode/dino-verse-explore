import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { initMutationOption } from '../../../../../features/gli/RentalApprovals/init/initMutationOption';
import { retrieveSubscriptionQueryOption } from '../../../../../features/gli/Subscriptions/retrieveSubscription/retrieveSubscriptionQueryOption';

export const useNewRequestPresenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const optionInit = initMutationOption(dispatch);
  const optionSubscribe = retrieveSubscriptionQueryOption({ data: {}, params: {} }, dispatch);
  const { data } = useQuery(optionSubscribe);

  const mutationInit = useMutation({
    ...optionInit,
    onSuccess(data, variables, context) {
      navigate({
        to: '/creategli/$ID_rentalapproval',
        params: {
          ID_rentalapproval: data.id,
        },
      });
    },
  });
  const handleInit = async () => {
    await mutationInit.mutateAsync({
      data: {},
      params: {
        subscriptionId: data?.id!,
      },
    });
  };
  return { handleInit, isLoading: mutationInit.isPending };
};
