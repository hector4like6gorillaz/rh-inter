import localforage from 'localforage'

const getCollapseState = async (): Promise<any> => {
  const results = await localforage.getItem(import.meta.env.VITE_APP_LOCAL_COLLAPSE)

  return results
}
const setCollapseInitState = async (): Promise<any> => {
  const results = await localforage.setItem(import.meta.env.VITE_APP_LOCAL_COLLAPSE, false)
  return results
}
const setCollapseStateLocal = async ({ state }: { state: boolean }): Promise<any> => {
  const results = await localforage.setItem(import.meta.env.VITE_APP_LOCAL_COLLAPSE, state)
  return results
}

export { getCollapseState, setCollapseInitState, setCollapseStateLocal }
