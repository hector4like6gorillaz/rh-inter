import axios, { AxiosInstance } from 'axios'

type APIName = 'khor' | 'firebase'

const tokens: Record<APIName, string | null> = {
  khor: sessionStorage.getItem(import.meta.env.VITE_APP_TOKENNAME_KHOR),
  firebase: sessionStorage.getItem(import.meta.env.VITE_APP_TOKENNAME_FIRE),
}

const baseURLs: Record<APIName, string> = {
  khor: import.meta.env.VITE_APP_API_KHOR,
  firebase: import.meta.env.VITE_APP_API_FIRE,
}

const getInstance = (name: APIName, contentType: 'json' | 'form' = 'json'): AxiosInstance => {
  const token = tokens[name]
  const headers: any = {}

  if (contentType === 'json') {
    headers['Content-Type'] = 'application/json; charset=utf-8'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return axios.create({
    baseURL: baseURLs[name],
    headers,
  })
}

export const API = {
  main: getInstance('khor'),
  firebase: getInstance('firebase'),
}
