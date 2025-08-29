import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from '@tanstack/react-router';

interface QueriesStateHandlerProps {
  queries: Array<UseQueryResult<any, any>>;
  children: ReactNode; // Plus une fonction, juste un ReactNode
  loadingFallback?: ReactNode;
  errorFallback?: (errors: Array<UseQueryResult<any, any>>) => ReactNode;
}

function QueriesStateHandler({
  queries,
  children,
  loadingFallback = <div>Chargement...</div>,
  errorFallback,
}: QueriesStateHandlerProps): ReactNode {
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
