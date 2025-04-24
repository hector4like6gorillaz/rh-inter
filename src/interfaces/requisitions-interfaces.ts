import { ICandidate } from './candidates-interface'

export interface IRequisitionKhor {
  idOferta: number
  folioRequisicion: number
  tipoVacante: string
  tipoContratacion: string
  estado: string
  puestoACubrir: string
  lider: string
  solicitante: string
  fechaCreacion: Date | string
  fechaCierre: Date | string
  escolaridad: string
  especialidad: string
  programa: string
  tienePersonal: string
  requiereViajar: string
  frecuencia: string
  funcionesPrincipales: string
  tiempoExperiencia: string
  relacionAreas: string
  ebs: string
  inbrokerRe: string
  inbrokerSofia: string
  bi: string
  otros: string
  otrosAccesos: string
}

export interface IRequisitionData {
  id: string
  psycometricScore: []
  examScore: []
  videoURL: []
  interviewSended: []
  uuid: string
  idOferta: number
  candidatosList: string[]
  descriptionShort: string
  descriptionFull: string
  exam: IExam[]
  candidatosListFullData: ICandidate[]
}

export interface IExam {
  pregunta: string
  respuesta: string
}
