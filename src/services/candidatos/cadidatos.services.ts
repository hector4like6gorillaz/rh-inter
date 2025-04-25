import { API } from '../multi-config'

const postSendEmailCuestionarie = async ({
  idOferta,
  vacante,
  candidatos,
}: {
  idOferta: number
  vacante: string
  candidatos: { email: string; nombre: string }[]
}): Promise<any> => {
  const body = { idOferta, vacante, candidatos }
  const results = await API.firebase.post(`email/sendExamen`, body)
  const { data } = results
  return data
}

export { postSendEmailCuestionarie }
