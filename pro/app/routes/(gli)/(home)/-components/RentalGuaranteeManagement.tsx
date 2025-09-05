import { useMemo, useState } from 'react';
import { Search, MoreHorizontal, Download, ChevronLeft, ChevronRight, User, Building, Users, RefreshCw } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { NewRequest } from './newRequest/NewRequest';
import { useDispatch } from 'react-redux';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { RentalApprovalStatusFilter, useFiltres } from './useFiltres';
import { GliRentalApprovalStatus, RentalApproval } from '../../../../features/gli/RentalApprovals/model/RentalApproval';
import { retrieveSubscriptionQueryOption } from '../../../../features/gli/Subscriptions/retrieveSubscription/retrieveSubscriptionQueryOption';
import { retrieveRentalApprovalsQueryOption } from '../../../../features/gli/RentalApprovals/retrieveRentalApprovals/retrieveRentalApprovalsQueryOption';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '../../../../../../packages/component/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../../../packages/component/ui/dropdown-menu'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../../../../../../packages/component/ui/select'
import { Button} from '../../../../../../packages/component/ui/button'
import {Badge } from '../../../../../../packages/component/ui/badge'
import { Separator} from '../../../../../../packages/component/ui/separator'
import { Input} from '../../../../../../packages/component/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../../packages/component/ui/table'
import { archiveProjectMutationOption } from '../../../../features/gli/archiveProject/archiveProjectMutationOption';

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

const columnHelper = createColumnHelper<RentalApproval>();
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

const AddressCell = ({ address }) => {
  const shortAddress = address?.length > 50 ? address.substring(0, 50) + '...' : address;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="max-w-xs cursor-help">
            <div className="text-sm text-gray-900 font-medium truncate">{shortAddress}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-sm p-3">
          <div className="text-sm whitespace-pre-wrap">{address}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const OwnersCell = ({ owners }) => {
  if (!owners || owners?.length === 0) return <span className="text-gray-400">-</span>;

  const primaryOwner = owners?.[0];
  const additionalCount = owners?.length - 1;

  const getPrimaryOwnerName = (owner) => {
    if (owner.naturalEntity) {
      return `${owner.naturalEntity.firstName} ${owner.naturalEntity.lastName}`;
    }
    if (owner.legalEntity) {
      return owner.legalEntity.name;
    }
    return 'Propriétaire inconnu';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help max-w-[200px]">
            {primaryOwner.naturalEntity ? (
              <User className="h-3 w-3 text-blue-500 flex-shrink-0" />
            ) : (
              <Building className="h-3 w-3 text-green-500 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{getPrimaryOwnerName(primaryOwner)}</div>
              {additionalCount > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Users className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    +{additionalCount} autre{additionalCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="p-3">
          <div>
            <div className="font-medium mb-2">Propriétaire{owners?.length > 1 ? 's' : ''}</div>
            <div className="space-y-2 max-w-sm">
              {owners?.map((owner, index) => (
                <div key={owner.id} className="flex items-center gap-2">
                  {owner.naturalEntity ? <User className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                  <span className="text-sm">
                    {owner.naturalEntity
                      ? `${owner.naturalEntity.firstName} ${owner.naturalEntity.lastName}`
                      : owner.legalEntity?.name || 'Inconnu'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TenantsCell = ({ tenants }) => {
  if (!tenants || tenants?.length === 0) return <span></span>;

  const primaryTenant = tenants?.[0];
  const additionalCount = tenants?.length - 1;

  const getPrimaryTenantName = (tenant) => {
    if (tenant.tenant?.naturalEntity) {
      return `${tenant.tenant.naturalEntity.firstName} ${tenant.tenant.naturalEntity.lastName}`;
    }
    if (tenant.tenant?.legalEntity) {
      return tenant.tenant.legalEntity.name;
    }
    return 'Locataire inconnu';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help max-w-[200px]">
            {primaryTenant.tenant?.naturalEntity ? (
              <User className="h-3 w-3 text-purple-500 flex-shrink-0" />
            ) : (
              <Building className="h-3 w-3 text-orange-500 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{getPrimaryTenantName(primaryTenant)}</div>
              {additionalCount > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Users className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    +{additionalCount} autre{additionalCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="p-3">
          <div>
            <div className="font-medium mb-2">Locataire{tenants?.length > 1 ? 's' : ''}</div>
            <div className="space-y-2 max-w-sm">
              {tenants?.map((tenant, index) => (
                <div key={tenant.id} className="flex items-center gap-2">
                  {tenant.tenant?.naturalEntity ? <User className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                  <span className="text-sm">
                    {tenant.tenant?.naturalEntity
                      ? `${tenant.tenant.naturalEntity.firstName} ${tenant.tenant.naturalEntity.lastName}`
                      : tenant.tenant?.legalEntity?.name || 'Inconnu'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const RentalGuaranteeManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    search,
    status,
    pageIndex,
    pageSize,
    groupe,
    setSearch,
    setStatus,
    setPageIndex,
    setPageSize,
    resetFilters,
    setGroupe,
    apiParams,
  } = useFiltres({
    defaultPageSize: 10,
  });
  const optionSubscribe = retrieveSubscriptionQueryOption({ data: {}, params: {} }, dispatch);
  const { data: subscriptionData, isLoading: isLoadingSubscription } = useQuery(optionSubscribe);

  const optionRetrieveRentalApprovals = retrieveRentalApprovalsQueryOption(
    {
      data: {},
      params: {
        subscriptionId: subscriptionData?.id || '',
        ...apiParams,
      },
    },
    dispatch,
  );

  const {
    data: retrieveRentalApprovals,
    isLoading: isLoadingRentalApprovals,
    isFetching: isFetchingRentalApprovals,
    isError,
  } = useQuery({
    ...optionRetrieveRentalApprovals,
    enabled: !!subscriptionData?.id,
    placeholderData: keepPreviousData,
  });
  const archiveProjectOption = archiveProjectMutationOption(dispatch);
  const mutationArchiveProject = useMutation(archiveProjectOption);
  const handleArchiveProject = async (rentalApprovalId: string) => {
    await mutationArchiveProject.mutateAsync({
      data: {},
      params: {
        rentalApprovalId,
        subscriptionId: subscriptionData?.id || '',
      },
    });
  };
  const columns = useMemo<ColumnDef<RentalApproval>[]>(
    () => [
      columnHelper.accessor('references.rentalApprovalRef', {
        id: 'rentalApprovalRef',
        header: 'Référence',
        cell: ({ getValue }) => {
          const ref = getValue();
          return <span className="text-sm ">{ref || '-'}</span>;
        },
        enableSorting: false,
        size: 140,
      }),
      columnHelper.accessor('owners', {
        id: 'owners',
        header: 'Propriétaire(s)',
        cell: ({ getValue }) => {
          const owners = getValue();
          return <OwnersCell owners={owners} />;
        },
        enableSorting: false,
        size: 200,
      }),
      columnHelper.accessor('tenants', {
        id: 'tenants',
        header: 'Locataire(s)',
        cell: ({ getValue }) => {
          const tenants = getValue();
          return <TenantsCell tenants={tenants} />;
        },
        enableSorting: false,
        size: 200,
      }),
      columnHelper.accessor('realEstateLot.address.fullAddress', {
        id: 'address',
        header: 'Adresse du lot',
        cell: ({ getValue }) => <AddressCell address={getValue()} />,
        enableSorting: false,
        size: 220,
      }),
      columnHelper.accessor('createDate', {
        id: 'createDate',
        header: 'Date de demande',
        cell: ({ getValue }) => (
          <span className="text-sm">
            {new Date(getValue()).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        ),
        enableSorting: false,
        size: 150,
      }),
      columnHelper.accessor('businessData.rentAmount', {
        id: 'rentAmount',
        header: 'Loyer CC',
        cell: ({ getValue }) => {
          const amount = getValue();
          return <span className="font-medium">{amount ? `${amount.toFixed(2)} €` : ''}</span>;
        },
        enableSorting: false,
        size: 120,
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: 'Statut de la demande',
        cell: ({ getValue }) => {
          const statusInfo = getStatusInfo(getValue());
          return (
            <div className="text-center">
              <Badge variant={statusInfo.variant as any}>{statusInfo.text}</Badge>
            </div>
          );
        },
        enableSorting: false,
        size: 150,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate({
                      to: '/gli/$ID_rentalapproval',
                      params: {
                        ID_rentalapproval: row.original.id,
                      },
                    });
                  }}
                >
                  Voir détails
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  className=""
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleArchiveProject(row.original.id);
                  }}
                >
                  {row.original.isArchived ? 'Désarchiver' : 'Archivé'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        size: 80,
      }),
    ],
    [navigate],
  );

  const table = useReactTable<RentalApproval>({
    data: retrieveRentalApprovals?.data ?? [],
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const isLoading = isLoadingSubscription || isLoadingRentalApprovals;
  const hasData = retrieveRentalApprovals && retrieveRentalApprovals?.data?.length > 0;
  const totalCount = retrieveRentalApprovals?.rowCount || 0;
  const pageCount = Math.ceil(totalCount / pageSize);
  const hasNextPage = pageIndex < pageCount - 1;
  const hasPreviousPage = pageIndex > 0;
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className=" w-full">
      <div className="border-b">
        <div className=" px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Garanties GLI</h1>
              <p className="text-sm text-muted-foreground mt-1">Gérez vos demandes de GLI</p>
            </div>
            <div className="flex items-center gap-3">
              <NewRequest />
            </div>
          </div>
        </div>
      </div>

      <div className="  px-6 py-6">
        <div className="flex items-center gap-1 mb-6">
          {[
            { id: '1', label: 'En cours', count: 7, value: RentalApprovalStatusFilter.Ongoing },
            { id: '2', label: 'Actives', count: 12, value: RentalApprovalStatusFilter.Active },
            { id: '3', label: 'Archivées', count: 45, value: RentalApprovalStatusFilter.Archived },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={groupe === tab.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setGroupe(tab.value)}
              className="justify-start"
            >
              {tab.label}
              <Badge variant="ocean" className="ml-2">
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-9 w-80" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select
              value={status?.toString() || 'all'}
              onValueChange={(value) => setStatus(value === 'all' ? undefined : (Number(value) as GliRentalApprovalStatus))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value?.toString() || 'all'} value={option.value?.toString() || 'all'}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 par page</SelectItem>
                <SelectItem value="25">25 par page</SelectItem>
                <SelectItem value="50">50 par page</SelectItem>
              </SelectContent>
            </Select>
            {(search || status) && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Réinitialiser
              </Button>
            )}
          </div>

          {hasData && (
            <div className="text-sm text-muted-foreground">
              {startItem}-{endItem} sur {totalCount} résultats
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Chargement...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-600">Erreur lors du chargement des données</p>
          </div>
        ) : (
          <>
            <div className="relative shadow-[0_0.7px_0_0_rgba(0,0,0,0.1)] shadow-bottom-only rounded-md">
              {isFetchingRentalApprovals && !isLoading && (
                <div className="absolute top-0 left-0 right-0 z-20">
                  <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
                    <div className="h-full bg-gradient-to-r from-transparent via-background to-transparent opacity-30"></div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <Table className="table-no-hover table-fixed">
                  <TableHeader className="bg-primary/10 table-header-no-hover">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="font-medium" style={{ width: `${header.getSize()}px` }}>
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                </Table>

                <div className="max-h-[300px] 2xl:max-h-[500px] 3xl:max-h-[900px] overflow-y-auto">
                  <Table className="table-no-hover table-fixed">
                    <TableBody>
                      {hasData ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            className="cursor-pointer"
                            onClick={() => {
                              navigate({
                                to: '/gli/$ID_rentalapproval',
                                params: {
                                  ID_rentalapproval: row.original.id,
                                },
                              });
                            }}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }} className="overflow-hidden">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="hover:bg-transparent">
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            <div className="w-full">
                              <div className="text-center py-12">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                  <Search className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="font-medium mb-1">Aucun résultat</h3>
                                <p className="text-sm text-muted-foreground">
                                  {search || status ? 'Aucune garantie GLI ne correspond à vos critères' : 'Aucune garantie GLI trouvée'}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-muted-foreground">
                {totalCount > 0 ? (
                  <>
                    Page {pageIndex + 1} sur {Math.max(1, pageCount)} - {totalCount} résultat{totalCount > 1 ? 's' : ''}
                  </>
                ) : (
                  'Aucun résultat'
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPageIndex(0)} disabled={!hasPreviousPage || totalCount === 0}>
                  Premier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex(pageIndex - 1)}
                  disabled={!hasPreviousPage || totalCount === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPageIndex(pageIndex + 1)} disabled={!hasNextPage || totalCount === 0}>
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex(Math.max(0, pageCount - 1))}
                  disabled={!hasNextPage || totalCount === 0}
                >
                  Dernier
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
