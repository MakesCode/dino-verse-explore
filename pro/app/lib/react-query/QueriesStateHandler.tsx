import { UseQueryResult } from '@tanstack/react-query';

interface QueriesStateHandlerProps {
  queries: Array<UseQueryResult<any, any>>;
  children: any; // Plus une fonction, juste un any
  loadingFallback?: any;
  errorFallback?: (errors: Array<UseQueryResult<any, any>>) => any;
}

function QueriesStateHandler({
  queries,
  children,
  loadingFallback = <div>Chargement...</div>,
  errorFallback,
}: QueriesStateHandlerProps): any {
  const isAnyLoading = queries.some((query) => query.isLoading);
  const errors = queries.filter((query) => query.error);

  if (isAnyLoading) {
    return loadingFallback;
  }

  if (errors.length > 0) {
    if (errorFallback) {
      return errorFallback(errors);
    }
    const errorMessages = errors.map((query) => query.error.message).join(', ');
    return <div>Erreur : {errorMessages}</div>;
  }

  return <>{children}</>;
}

export default QueriesStateHandler;
