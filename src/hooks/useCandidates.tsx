import { DocumentMagnifyingGlassIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IRequisitionData, IRequisitionKhor } from 'src/interfaces/requisitions-interfaces'

import { catchError, defer, finalize, forkJoin, from, throwError } from 'rxjs'
import { notify, notifyError, notifyWarning } from 'src/utilities/toastify.utilities'
import {
  getRequisitionByIdWithCandidates,
  postRequisition,
} from 'src/services/requisitions/requisitions.service'

const useCandidates = () => {
  const location = useLocation()
  const { requisition, idOferta } = location.state || {}

  const [requisitionData, setrequisitionData] = useState<IRequisitionKhor | null | false>(null)
  const hasFetched = useRef(false)
  const navigate = useNavigate()
  const [candidatesElements, setCandidatesElements] = useState<any[]>([])

  const [loading, setloading] = useState(false)
  const [loadinInitRequisition, setloadinInitRequisition] = useState(false)

  const [search, setsearch] = useState('')
  const [resumenCandidato, setresumenCandidato] = useState('')
  const [candidateNameSelected, setcandidateNameSelected] = useState('')
  const [showModal, setshowModal] = useState(false)

  const [fullRequisition, setfullRequisition] = useState<IRequisitionData | null>(null)

  const closeModal = () => setshowModal(false)

  const getRequisitionByIdWithCandidatesService = () => {
    setloading(true)
    return defer(() =>
      getRequisitionByIdWithCandidates({ idOferta }).then((dat) => {
        return dat
      }),
    ).pipe(
      finalize(() => setloading(false)),
      catchError((e) => {
        return throwError(() => e)
      }),
    )
  }

  const postRequisitionService = () => {
    setloadinInitRequisition(true)
    return defer(() =>
      postRequisition({
        body: {
          funciones: requisition.funcionesPrincipales,
          idOferta,
          puesto: requisition.puestoACubrir,
        },
      }).then((dat) => {
        return dat
      }),
    ).pipe(
      finalize(() => setloading(false)),
      catchError((e) => {
        return throwError(() => e)
      }),
    )
  }

  const handleRequisition = () => {
    postRequisitionService().subscribe({
      next: () => {
        navigate(-1)
        setloadinInitRequisition(false)
        notify(`Requisición para '${requisition.puestoACubrir}' creada con exito`)
      },
      error: (error) => console.error('Error al refrescar tags:', error),
    })
  }

  const handleSearch = (search: string) => {
    setsearch(search)
  }

  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pdf',
      dataIndex: 'pfd',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                <Tooltip title='CV candidato'>
                  <DocumentMagnifyingGlassIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: '#039ecc',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/pdf-visualizer', { state: { uriPdf: record.pdf } })
                    }}
                  />
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
    {
      title: 'Cuestionario',
      dataIndex: 'cuestionario',
      key: 'cuestionario',
    },
    {
      title: 'Psicométricos',
      dataIndex: 'psicometrico',
      key: 'psicometrico',
    },
    {
      title: 'Resumen Candidato',
      key: 'resumen',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                <Tooltip title='Resumen del candidato'>
                  <EyeIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: '#039ecc',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setshowModal(true)
                      setresumenCandidato(record.summary)
                      setcandidateNameSelected(record.name)
                    }}
                  />
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
  ]

  useEffect(() => {
    if (hasFetched.current) return

    const subscription = forkJoin({
      requisitionData: from(getRequisitionByIdWithCandidatesService()),
    }).subscribe({
      next: ({ requisitionData }) => {
        setfullRequisition(requisitionData)
        setloading(false)
        setCandidatesElements(
          requisitionData.candidatosListFullData.map((item) => {
            return {
              id: item.id,
              name: item.name,
              pdf: item.cvPublicURL,
              cuestionario: 'sin resultado',
              psicometrico: 'sin resultado',
              summary: item.summary,
            }
          }),
        )
        hasFetched.current = true
      },
      error: (error) => {
        console.error('Error en la llamada:', error)
        switch (error.status) {
          case 401:
            notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
            break
          case 404:
            notifyWarning(
              `${error.response.data.message} No se encontraron coincidencias para ${requisition.puestoACubrir}`,
            )
            setrequisitionData(false)
            break
          default:
            break
        }
      },
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (requisition !== undefined && requisition !== null) {
      setrequisitionData(requisition)
    }
    return () => {}
  }, [requisition])

  return {
    //global variables

    //variables
    columns,
    candidatesElements,
    loading,
    fullRequisition,
    requisitionData,
    resumenCandidato,
    showModal,
    candidateNameSelected,
    loadinInitRequisition,
    //local functions

    handleSearch,
    navigate,
    closeModal,
    handleRequisition,
  }
}

export default useCandidates
