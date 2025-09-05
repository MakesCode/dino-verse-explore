import { Button } from '../../../../../../../packages/component/ui/button';
import { Plus } from 'lucide-react';
import { useNewRequestPresenter } from './useNewRequestPresenter';
import { Loading } from '../../../../../../../packages/component/sgComponent/Loading';

export const NewRequest = () => {
  const { handleInit, isLoading } = useNewRequestPresenter();
  return (
    <>
      <Button size="sm" onClick={handleInit} disabled={isLoading}>
        {isLoading ? <Loading /> : <Plus className="h-4 w-4 mr-2" />}
        Nouvelle demande
      </Button>
    </>
  );
};
