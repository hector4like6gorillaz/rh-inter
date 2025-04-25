import { Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import P from 'src/components/paragraph/P'
import { initRequisitions } from 'src/constants/requisitions-constants'
import { IRequisitionKhor } from 'src/interfaces/requisitions-interfaces'
import { formatTimestamp } from 'src/utilities/timestamp-to-date.utilities'
import { notifyError } from 'src/utilities/toastify.utilities'
import { normalizeText } from 'src/utilities/words-utilities'
import { timer, Subscription } from 'rxjs'
import { EyeIcon } from '@heroicons/react/24/outline'

const useReqisitions = () => {
  //const hasFetched = useRef(false)
  const navigate = useNavigate()
  const [requisitionstElements, setRequisitionsElements] =
    useState<IRequisitionKhor[]>(initRequisitions)
  const [requisitionsCopyElements, setrequisitionsCopyElements] =
    useState<IRequisitionKhor[]>(initRequisitions)
  const [loading, setloading] = useState(false)
  const [search, setsearch] = useState('')

  const getNextPrevPageInventary = async ({ save = false }: { save?: boolean }) => {
    console.log(save)
    try {
      setloading(true)

      //const dat = await getPokemonById({ page, search }) // esperar la promesa
      const dat = 2
      return dat
    } catch (e: any) {
      if (e.status === 401) {
        notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
        //cleanToken()
      } else {
        notifyError('Ha ocurrido un error al cargar la lista de pacientes. Contactar con soporte.')
      }
      console.log(e)
      throw e // lanzar el error para que rxjs pueda capturarlo
    } finally {
      setloading(false)
    }
  }

  const handleSearch = (search: string) => {
    setsearch(search)
  }

  const filterSearch = () => {
    let searched: IRequisitionKhor[] = []

    if (search !== '' && requisitionstElements.length !== 0) {
      const normalizedSearch = normalizeText(search)

      searched = [
        ...requisitionstElements.filter((el) => normalizeText(el.lider).includes(normalizedSearch)),
        ...requisitionstElements.filter((el) =>
          normalizeText(el.puestoACubrir).includes(normalizedSearch),
        ),
        ...requisitionstElements.filter((el) =>
          normalizeText(el.solicitante).includes(normalizedSearch),
        ),
        ...requisitionstElements.filter((el) =>
          normalizeText(el.relacionAreas).includes(normalizedSearch),
        ),
      ]

      searched = [...new Set(searched)]
      setrequisitionsCopyElements(searched)
      console.log(searched)
    }
  }

  const columns = [
    {
      title: 'Ver candidatos',
      key: 'unitOfMeasurement',
      render: (_: any, record: IRequisitionKhor) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center', columnGap: '1rem' }}>
                <Tooltip title='Editar producto'>
                  <EyeIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: '#039ecc',
                      fill: 'white',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log(record)
                      navigate('/candidates', {
                        state: { requisition: record, idOferta: record.idOferta },
                      })
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
      title: 'Puesto',
      dataIndex: 'puestoACubrir',
      key: 'puestoACubrir',
    },
    {
      title: 'Departamento',
      dataIndex: 'relacionAreas',
      key: 'relacionAreas',
    },
    {
      title: 'Solicitante',
      dataIndex: 'solicitante',
      key: 'solicitante',
    },
    {
      title: 'Lider',
      dataIndex: 'lider',
      key: 'lider',
    },
    {
      title: 'Tipo de vacante',
      dataIndex: 'tipoVacante',
      key: 'tipoVacante',
    },
    {
      title: 'Fecha',
      dataIndex: 'fechaCreacion',

      render: (_: any, record: IRequisitionKhor) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem' }}>
                <P>{formatTimestamp(record.fechaCreacion as Date)} </P>
              </div>
            )
          })()}
        </>
      ),
    },
  ]
  useEffect(() => {
    setRequisitionsElements(initRequisitions)

    return () => {}
  }, [])

  useEffect(() => {
    let subscription: Subscription

    if (search === '') {
      subscription = timer(1000).subscribe(() => {
        setrequisitionsCopyElements(requisitionstElements)
      })
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [search])

  return {
    //global variables

    //variables
    columns,
    requisitionsCopyElements,
    loading,
    search,
    //local functions
    getNextPrevPageInventary,
    handleSearch,
    filterSearch,
  }
}

export default useReqisitions
