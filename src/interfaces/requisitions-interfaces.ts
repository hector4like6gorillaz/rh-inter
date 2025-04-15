export interface IRequisition {
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
