import { DependenciesProvider } from "./DependenciesProvider"

export const Provider = (props) => {
  return (
    <>
      <DependenciesProvider dependencies={{
  // ProductRepository: new usePresenter(),
}}>
        {props.children}
      </DependenciesProvider>
    </>
  )
}