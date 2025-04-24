export interface ICandidate {
  id: string
  name: string
  currentCompany: string
  location: null | string
  currentRole: string
  email: string
  lastDegreeOfStudies: string
  internalCandidate: boolean
  cvPublicURL: string
  history: string[]
  summary: string
  uuid: string
  updatedAt: Date
  cvURL: string
}
