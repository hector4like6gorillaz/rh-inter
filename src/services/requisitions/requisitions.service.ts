import { ICandidate } from 'src/interfaces/candidates-interface'
import { SERVICE } from '../config'
import { API } from '../multi-config'
import { IRequisitionData } from 'src/interfaces/requisitions-interfaces'

const postKhorLogin = async ({ body }: { body: any }) => {
  const results = await SERVICE().post(`apiRequisiciones/login`, body)
  const { data } = results
  return data
}
const getCandidates = async (): Promise<ICandidate[]> => {
  const results = await API.firebase.get(`rh-old-services/candidatos`)
  const { data } = results
  return data
}
const getRequisitionByIdWithCandidates = async ({
  idOferta,
}: {
  idOferta: number
}): Promise<IRequisitionData> => {
  const results = await API.firebase.get(`rh-old-services/requisiciones/${idOferta}`)
  const { data } = results
  return data
}

const postRequisition = async ({
  body,
}: {
  body: { puesto: string; funciones: string; idOferta: number }
}): Promise<any> => {
  const results = await API.firebase.post(`requisicion/create`, body)
  const { data } = results
  return data
}

const postPdfCv = async ({ file }: { file: File }): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)

  const results = await API.firebase.post(`rh-old-services/upload-cv`, formData)
  const { data } = results
  return data
}

export {
  postKhorLogin,
  getCandidates,
  getRequisitionByIdWithCandidates,
  postRequisition,
  postPdfCv,
}
