import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { queryOptions } from '@tanstack/react-query';
import { CtxsearchEntities, searchEntitiesUsecase } from './searchEntities.usecase';
import { Entity } from '../model/RentalApproval';
import { SmartGarantGrid } from '../../../common/model/SmartGarantResponse';

export const searchEntitiesQueryOption = (ctx: CtxsearchEntities, dispatch?: Dispatch<UnknownAction> | null | undefined) =>
  queryOptions<SmartGarantGrid<Entity>>({
    queryKey: ['entities', ctx.params?.search],
    queryFn: async () => {
      const data: SmartGarantGrid<Entity> = await dispatch?.(searchEntitiesUsecase(ctx) as any).unwrap();
      return data;
    },
    enabled: !!(ctx.params.subscriptionId || ctx.params.search),
  });
