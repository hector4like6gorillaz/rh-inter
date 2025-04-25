import { DocumentMagnifyingGlassIcon, UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import P from 'src/components/paragraph/P'
import {
  catchError,
  defer,
  forkJoin,
  from,
  Subject,
  switchMap,
  takeUntil,
  throwError,
  timer,
} from 'rxjs'
import { notify, notifyError } from 'src/utilities/toastify.utilities'
import {
  getCandidates,
  postCandidateToRequisition,
  postPdfCv,
} from 'src/services/requisitions/requisitions.service'
import { ICandidate } from 'src/interfaces/candidates-interface'
import { formatTimestamp } from 'src/utilities/timestamp-to-date.utilities'
import { normalizeText } from 'src/utilities/words-utilities'

const useDirectory = () => {
  const location = useLocation()
  const { idOferta, puesto } = location.state || {}
  const hasFetched = useRef(false)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const [candidatesElements, setcandidatesElements] = useState<ICandidate[]>([])
  const [addCandidateSelected, setaddCandidateSelected] = useState<ICandidate[]>([])
  const [filteredSearch, setfilteredSearch] = useState<ICandidate[]>([])

  const [loading, setloading] = useState(false)
  const [search, setsearch] = useState('')

  const getCandidatesDirectoryService = () => {
    setloading(true)
    return defer(() =>
      getCandidates().then((dat) => {
        return dat
      }),
    ).pipe(
      catchError((e) => {
        if (e.status === 401) {
          notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
          //cleanToken()
        } else {
          notifyError('Ha ocurrido un error al cargar la lista de marcas. Contactar con soporte.')
        }
        return throwError(() => e)
      }),
    )
  }
  const handleCandidatesService = () => {
    getCandidatesDirectoryService().subscribe({
      next: (candidatesDirectory) => {
        setcandidatesElements(candidatesDirectory)
        setfilteredSearch(candidatesDirectory)
        setloading(false)
      },
      error: (error) => console.error('Error al refrescar directorio:', error),
    })
  }
  const handleSearch = (search: string) => {
    setsearch(search)
  }

  const doFilterSearch = () => {
    if (candidatesElements.length === 0 || !search.trim()) return []

    const normalizedSearch = normalizeText(search)
    const results = new Set<ICandidate>()

    candidatesElements.forEach((item: ICandidate) => {
      const name = normalizeText(item.name)
      const company = normalizeText(item.currentCompany)
      const degree = normalizeText(item.lastDegreeOfStudies)
      const role = normalizeText(item.currentRole)

      if (name.includes(normalizedSearch)) results.add(item)
      if (company.includes(normalizedSearch)) results.add(item)
      if (degree.includes(normalizedSearch)) results.add(item)
      if (role.includes(normalizedSearch)) results.add(item)
    })

    setfilteredSearch(Array.from(results))
  }
  const restartFilter = () => {
    setfilteredSearch(candidatesElements)
  }
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Puesto Actual',
      dataIndex: 'currentRole',
      key: 'currentRole',
    },
    {
      title: 'Empresa Actual',
      dataIndex: 'currentCompany',
      key: 'currentCompany',
    },
    {
      title: 'Últimos Estudios',
      dataIndex: 'lastDegreeOfStudies',
      key: 'lastDegreeOfStudies',
    },
    {
      title: 'Ubicación',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Pdf',
      dataIndex: 'cvURL',
      render: (_: any, record: ICandidate) => (
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
                      navigate('/pdf-visualizer', { state: { uriPdf: record.cvPublicURL } })
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
      title: 'Fecha',
      key: 'unitOfMeasurement',
      render: (_: any, record: ICandidate) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem' }}>
                <Tooltip title='Editar producto'>
                  <P>{formatTimestamp(record.updatedAt)} </P>
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
  ]

  const handleAddDeleteCandidate = ({
    add,
    candidate,
  }: {
    add: boolean
    candidate: ICandidate
  }) => {
    setaddCandidateSelected((prev) => {
      if (add) {
        const alreadyAdded = prev.some((item) => item.id === candidate.id)
        if (!alreadyAdded) {
          return [...prev, candidate]
        }
        return prev
      } else {
        return prev.filter((item) => item.id !== candidate.id)
      }
    })
  }

  const columnsAddCandidate = ({ add }: { add: boolean }) => {
    let column = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Puesto Actual',
        dataIndex: 'currentRole',
        key: 'currentRole',
      },
      {
        title: 'Empresa Actual',
        dataIndex: 'currentCompany',
        key: 'currentCompany',
      },
      {
        title: 'Últimos Estudios',
        dataIndex: 'lastDegreeOfStudies',
        key: 'lastDegreeOfStudies',
      },
      {
        title: 'Ubicación',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Pdf',
        dataIndex: 'cvURL',
        render: (_: any, record: ICandidate) => (
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
                        navigate('/pdf-visualizer', { state: { uriPdf: record.cvPublicURL } })
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
        title: 'Fecha',
        key: 'unitOfMeasurement',
        render: (_: any, record: ICandidate) => (
          <>
            {(() => {
              return (
                <div style={{ display: 'flex', columnGap: '1rem' }}>
                  <Tooltip title='Editar producto'>
                    <P>{formatTimestamp(record.updatedAt)} </P>
                  </Tooltip>
                </div>
              )
            })()}
          </>
        ),
      },
    ]
    if (add)
      column.unshift({
        title: 'Agregar',
        dataIndex: 'cvURL',
        render: (_: any, record: ICandidate) => (
          <>
            {(() => {
              return (
                <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                  <Tooltip title='Añadir a la lista de abajo'>
                    <UserPlusIcon
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        stroke: '#039ecc',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddDeleteCandidate({ add: true, candidate: record })
                      }}
                    />
                  </Tooltip>
                </div>
              )
            })()}
          </>
        ),
      })
    else
      column.unshift({
        title: 'Agregar',
        dataIndex: 'cvURL',
        render: (_: any, record: ICandidate) => (
          <>
            {(() => {
              return (
                <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                  <Tooltip title='Eliminar candidato de esta lista'>
                    <TrashIcon
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        stroke: 'red',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddDeleteCandidate({ add: false, candidate: record })
                      }}
                    />
                  </Tooltip>
                </div>
              )
            })()}
          </>
        ),
      })

    return column
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handlePostPdfService({ file: e.target.files[0] })
    }
  }

  const postPdfService = ({ file }: { file: File }) => {
    setloading(true)
    return defer(() =>
      postPdfCv({ file }).then((dat) => {
        return dat
      }),
    ).pipe(
      catchError((e) => {
        return throwError(() => e)
      }),
    )
  }
  const handlePostPdfService = ({ file }: { file: File }) => {
    postPdfService({ file }).subscribe({
      next: () => {
        notify(
          'CV subido con exito. Recuerda recargar el directorio despues de 30 segundos para ver/buscar en el directorio al nuevo candidato!',
        )
        if (inputRef.current) inputRef.current.value = ''
        setloading(false)
      },
      error: (e) => {
        console.error('Error al refrescar tags:', e)
        setloading(false)
        if (e.status === 401) {
          notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
        } else {
          notifyError('Ha ocurrido un error al subir el pdf. Contactar con soporte.')
        }
        if (inputRef.current) inputRef.current.value = ''
      },
    })
  }

  const postCandidateToRequisitionService = () => {
    setloading(true)
    return defer(() =>
      postCandidateToRequisition({
        idOferta,
        uuid: addCandidateSelected.map((item) => {
          return item.uuid
        }),
      }).then((dat) => {
        return dat
      }),
    ).pipe(
      catchError((e) => {
        return throwError(() => e)
      }),
    )
  }

  const handlePostCandidateToRequisitionService = () => {
    postCandidateToRequisitionService().subscribe({
      next: () => {
        notify('Candidato agregado con exito a la requisicion')
        setloading(false)
      },
      error: (e) => {
        console.error('Error al ingresar al candidato:', e)
        setloading(false)
        if (e.status === 401) {
          notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
        } else {
          notifyError(
            'Ha ocurrido un error al intentar agregar al candidato. Contactar con soporte.',
          )
        }
      },
    })
  }

  useEffect(() => {
    if (hasFetched.current) return

    const subscription = forkJoin({
      candidatesDirectory: from(getCandidatesDirectoryService()),
    }).subscribe({
      next: ({ candidatesDirectory }) => {
        setcandidatesElements(candidatesDirectory)
        setfilteredSearch(candidatesDirectory)
        setloading(false)
        hasFetched.current = true
      },
      error: (error) => console.error('Error en la llamada:', error),
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const cancel$ = new Subject<void>()
    timer(500)
      .pipe(
        takeUntil(cancel$),
        switchMap(() => {
          if (search === '') {
            setfilteredSearch(candidatesElements)
          }
          return []
        }),
      )
      .subscribe()

    return () => {
      cancel$.next()
      cancel$.complete()
    }
  }, [search])

  return {
    //global variables 445c8782-6580-4430-924a-9fe3f5f98d59

    //variables
    search,
    columns,
    candidatesElements,
    filteredSearch,
    loading,
    addCandidateSelected,
    inputRef,
    puesto,
    //local functions
    columnsAddCandidate,
    getCandidatesDirectoryService,
    handleSearch,
    navigate,
    handleCandidatesService,
    doFilterSearch,
    restartFilter,
    handleFileChange,
    handlePostPdfService,
    handlePostCandidateToRequisitionService,
  }
}

export default useDirectory
