import React from "react";

export type Dependencies = {
  // ProductRepository: IProductRepository
};

const DependenciesContext = React.createContext<Dependencies>(null as any);

export const DependenciesProvider: React.FC<{
  dependencies: Dependencies;
  children: React.ReactNode;
}> = ({ dependencies, children }) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = () => React.useContext(DependenciesContext); 