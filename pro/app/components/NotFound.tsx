import { Button } from '../../../packages/component/ui/button';
import { Link, useNavigate } from '@tanstack/react-router';
import logo from '@sg/assets/img/logo-white-full.png';

export function NotFound({ children }: { children?: any }) {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-full p-5">
      <div className="w-[40svh] mx-auto">
        <img src={logo} width={'100%'} height={'100%'} alt="SmartGarant Logo" />
      </div>
      <div className="text-center place-items-center  ">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Page non trouvée</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Désolé, nous n’avons pas pu trouver la page que vous recherchez.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            // className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() =>
              navigate({
                to: '/',
                replace: true,
              })
            }
          >
            Retourne sur la page d'accueil
          </Button>
        </div>
      </div>
    </main>
  );
}
