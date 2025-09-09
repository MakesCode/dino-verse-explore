import { useDispatch } from 'react-redux';
import { useMutation, useQuery, keepPreviousData } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { retrieveRentalApprovalsQueryOption } from '../../../features/gli/RentalApprovals/retrieveRentalApprovals/retrieveRentalApprovalsQueryOption';
import { archiveProjectMutationOption } from '../../../features/gli/archiveProject/archiveProjectMutationOption';
import { GliRentalApprovalStatus, RentalApproval } from '../../../features/gli/RentalApprovals/model/RentalApproval';
import type { UseFiltresHook } from '../DependenciesProvider';

export type UseRentalApprovalsPresenter = (ctx: { subscriptionId?: string }) => {
  // filters
  search: string;
  status: GliRentalApprovalStatus | undefined;
  groupe: number | undefined;
  pageIndex: number;
  pageSize: number;
  setSearch: (v: string) => void;
  setStatus: (v: GliRentalApprovalStatus | undefined) => void;
  setGroupe: (v: number | undefined) => void;
  setPageIndex: (v: number) => void;
  setPageSize: (v: number) => void;
  resetFilters: () => void;

  // data
  rows: RentalApproval[];
  hasData: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  totalCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startItem: number;
  endItem: number;

  // actions
  goToDetails: (id: string) => void;
  archive: (id: string) => Promise<void>;

  // static data
  statusOptions: { label: string; value: GliRentalApprovalStatus | undefined }[];
  getStatusInfo: (status: GliRentalApprovalStatus) => { text: string; variant: string };
};
export function createUseRentalApprovalsPresenterImpl({
  useFiltresHook,
}: {
  useFiltresHook: UseFiltresHook;
}): UseRentalApprovalsPresenter {
  return ({ subscriptionId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
      search,
      status,
      groupe,
      pageIndex,
      pageSize,
      setSearch,
      setStatus,
      setGroupe,
      setPageIndex,
      setPageSize,
      resetFilters,
      apiParams,
    } = useFiltresHook({ defaultPageSize: 10 });

    const optionRetrieveRentalApprovals = retrieveRentalApprovalsQueryOption(
      {
        data: {},
        params: {
          ...apiParams,
          subscriptionId: subscriptionId || '',
        },
      },
      dispatch,
    );

    const { data, isLoading, isFetching, isError } = useQuery({
      ...optionRetrieveRentalApprovals,
      enabled: !!subscriptionId,
      placeholderData: keepPreviousData,
    });

    const mutationArchiveProject = useMutation(archiveProjectMutationOption(dispatch));
    const archive = async (rentalApprovalId: string) => {
      await mutationArchiveProject.mutateAsync({
        data: {},
        params: {
          rentalApprovalId,
          subscriptionId: subscriptionId || '',
        },
      });
    };

    const rows = data?.data ?? [];

    const hasData = !!rows?.length;
    const totalCount = data?.rowCount || 0;
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasNextPage = pageIndex < pageCount - 1;
    const hasPreviousPage = pageIndex > 0;
    const startItem = pageIndex * pageSize + 1;
    const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

    const goToDetails = (id: string) =>
      navigate({
        to: '/gli/$ID_rentalapproval',
        params: { ID_rentalapproval: id },
      });

    const statusOptions = [
      { label: 'Tous', value: undefined },
      { label: 'En cours', value: GliRentalApprovalStatus.Draft },
      { label: 'Document en attente', value: GliRentalApprovalStatus.PendingDocument },
      { label: 'En attente', value: GliRentalApprovalStatus.Pending },
      { label: 'Approuvé', value: GliRentalApprovalStatus.Approved },
      { label: 'Rejeté', value: GliRentalApprovalStatus.Rejected },
      { label: 'Annulé', value: GliRentalApprovalStatus.Cancelled },
      { label: 'Actif', value: GliRentalApprovalStatus.Active },
      { label: 'Fin programmée', value: GliRentalApprovalStatus.FinishedScheduled },
      { label: 'Terminé', value: GliRentalApprovalStatus.Finished },
    ];

    const getStatusInfo = (status: GliRentalApprovalStatus) => {
      switch (status) {
        case GliRentalApprovalStatus.Initialized:
          return { text: 'Initialisé', variant: 'gray' };
        case GliRentalApprovalStatus.Draft:
          return { text: 'En cours', variant: 'outline' };
        case GliRentalApprovalStatus.PendingDocument:
          return { text: 'Document en attente', variant: 'yellow' };
        case GliRentalApprovalStatus.Pending:
          return { text: 'En attente', variant: 'blue' };
        case GliRentalApprovalStatus.Approved:
          return { text: 'Approuvé', variant: 'green' };
        case GliRentalApprovalStatus.Rejected:
          return { text: 'Rejeté', variant: 'red' };
        case GliRentalApprovalStatus.Cancelled:
          return { text: 'Annulé', variant: 'faintred' };
        case GliRentalApprovalStatus.Active:
          return { text: 'Actif', variant: 'forest' };
        case GliRentalApprovalStatus.FinishedScheduled:
          return { text: 'Fin programmée', variant: 'peach' };
        case GliRentalApprovalStatus.Finished:
          return { text: 'Terminé', variant: 'ocean' };
        default:
          return { text: 'Inconnu', variant: 'default' };
      }
    };

    return {
      // filters
      search,
      status,
      groupe,
      pageIndex,
      pageSize,
      setSearch,
      setStatus,
      setGroupe,
      setPageIndex,
      setPageSize,
      resetFilters,

      // data
      rows,
      hasData,
      isLoading,
      isFetching,
      isError,
      totalCount,
      pageCount,
      hasNextPage,
      hasPreviousPage,
      startItem,
      endItem,

      // actions
      goToDetails,
      archive,

      // constants
      statusOptions,
      getStatusInfo,
    };
  };
}

