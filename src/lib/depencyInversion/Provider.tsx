import { DependenciesProvider } from "./DependenciesProvider"

export const Provider = (props) => {
  return (
    <>
      <DependenciesProvider>
        {props.children}
      </DependenciesProvider>
    </>
  )
}
