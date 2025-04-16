import { SERVICE } from '../config'

const postKhorLogin = async ({ body }: { body: any }) => {
  const results = await SERVICE().post(`apiRequisiciones/login`, body)
  const { data } = results
  return data
}

export { postKhorLogin }
