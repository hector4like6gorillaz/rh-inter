export interface IApiGeneralResponse<T> {
  data: T
  status: number
  statusText: string
}
export interface ITokenDataEp {
  user: {
    id: number
    email: string
    roles: string[]
  }
  token: string
}

export interface IPaginationApi<T> {
  results: T[]
  pagination: IPagination
}
export interface IResultsApi<T> {
  results: T[]
}

export interface IPagination {
  perPage: number
  currentPage: number
  totalPages: number
  totalItems: number
  nextPage: string | null
  prevPage: string | null
}

export interface IApiGeneralBadResponse<T> {
  message: string
  name: string
  stack: string

  code: string
  status: number
  response: T
}

export interface IBadLoginMessage {
  data: {
    message: string[]
    error: string
    statusCode: number
  }
  status: number
  statusText: string
}
