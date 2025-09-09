import { ErrorComponent } from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Erreur</h1>
        <p className="text-xl text-gray-600 mb-4">Une erreur inattendue s'est produite</p>
        <p className="text-sm text-gray-500 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Recharger la page
        </button>
      </div>
    </div>
  );
}
