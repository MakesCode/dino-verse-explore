import { useEffect, useMemo, useState } from 'react';
import MockRentalApprovalsGateway from '../api/api-rentalApprovals';

export function createUseRentalApprovalsPresenterMock() {
  function useRentalApprovalsPresenter({ subscriptionId }: { subscriptionId?: string }) {
    const gateway = useMemo(() => new MockRentalApprovalsGateway(), []);

    // filters
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<number | undefined>(undefined);
    const [groupe, setGroupe] = useState<number | undefined>(1);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const resetFilters = () => {
      setSearch('');
      setStatus(undefined);
      setGroupe(1);
      setPageIndex(0);
      setPageSize(10);
    };

    // data state
    const [rows, setRows] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      if (!subscriptionId) return;
      let mounted = true;
      const fetch = async () => {
        setIsFetching(true);
        setIsLoading(pageIndex === 0 && rows.length === 0);
        setIsError(false);
        try {
          const res = await gateway.getRentalApprovals({
            params: {
              subscriptionId,
              search,
              pageIndex,
              limite: pageSize,
              status,
              groupe,
            },
            data: {},
          } as any);
          if (!mounted) return;
          setRows(res.payload.data);
          setTotalCount(res.payload.rowCount);
        } catch (e) {
          if (!mounted) return;
          setIsError(true);
        } finally {
          if (!mounted) return;
          setIsLoading(false);
          setIsFetching(false);
        }
      };
      fetch();
      return () => {
        mounted = false;
      };
    }, [subscriptionId, search, status, groupe, pageIndex, pageSize]);

    const pageCount = Math.ceil(totalCount / pageSize) || 1;
    const hasNextPage = pageIndex < pageCount - 1;
    const hasPreviousPage = pageIndex > 0;
    const startItem = pageIndex * pageSize + 1;
    const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

    const goToDetails = (id: string) => {
      // mock navigation: log only
      console.log('goToDetails', id);
    };
    const archive = async (id: string) => {
      await gateway.postArchiveProject({ params: { subscriptionId: subscriptionId || '', rentalApprovalId: id }, data: {} } as any);
      // refresh current page
      const res = await gateway.getRentalApprovals({ params: { subscriptionId: subscriptionId || '', search, pageIndex, limite: pageSize, status, groupe }, data: {} } as any);
      setRows(res.payload.data);
      setTotalCount(res.payload.rowCount);
    };

    const statusOptions = [
      { label: 'Tous', value: undefined },
      { label: 'En cours', value: 20 },
      { label: 'Document en attente', value: 30 },
      { label: 'En attente', value: 40 },
      { label: 'Approuvé', value: 50 },
      { label: 'Rejeté', value: 60 },
      { label: 'Annulé', value: 70 },
      { label: 'Actif', value: 80 },
      { label: 'Fin programmée', value: 90 },
      { label: 'Terminé', value: 100 },
    ];
    const getStatusInfo = (status: number) => {
      const map: Record<number, { text: string; variant: string }> = {
        10: { text: 'Initialisé', variant: 'gray' },
        20: { text: 'En cours', variant: 'outline' },
        30: { text: 'Document en attente', variant: 'yellow' },
        40: { text: 'En attente', variant: 'blue' },
        50: { text: 'Approuvé', variant: 'green' },
        60: { text: 'Rejeté', variant: 'red' },
        70: { text: 'Annulé', variant: 'faintred' },
        80: { text: 'Actif', variant: 'forest' },
        90: { text: 'Fin programmée', variant: 'peach' },
        100: { text: 'Terminé', variant: 'ocean' },
      };
      return map[status] || { text: 'Inconnu', variant: 'default' };
    };

    return {
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
      rows,
      hasData: rows.length > 0,
      isLoading,
      isFetching,
      isError,
      totalCount,
      pageCount,
      hasNextPage,
      hasPreviousPage,
      startItem,
      endItem,
      goToDetails,
      archive,
      statusOptions,
      getStatusInfo,
    };
  }
  return useRentalApprovalsPresenter;
}

