import axios, { AxiosInstance } from 'axios'

const isAuthenticated = () => false

export const tokenName = import.meta.env.VITE_APP_TOKENNAME

const environmentIsDev =
  window.location.href.includes('develop') || window.location.href.includes('localhost')

let baseURL: any = environmentIsDev
  ? import.meta.env.VITE_APP_API_KHOR
  : import.meta.env.VITE_APP_API_PROD

const getTokenData = (): string | null => {
  return sessionStorage.getItem(tokenName)
}
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: '',
}

const SERVICE = (): AxiosInstance => axios.create({ baseURL, headers })

const AUTHSERVICE = (): AxiosInstance => {
  if (!isAuthenticated()) window.location.href = '/'

  const token = getTokenData()
  let authHeaders = headers
  if (token !== null) {
    authHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    }
  }
  return axios.create({ baseURL, headers: authHeaders })
}

export { SERVICE, AUTHSERVICE }
