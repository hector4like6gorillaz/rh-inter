import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import P from 'src/components/paragraph/P'
import { IRequisition } from 'src/interfaces/requisitions-interfaces'
import { formatTimestamp } from 'src/utilities/timestamp-to-date.utilities'
import { notifyError } from 'src/utilities/toastify.utilities'

const useReqisitions = () => {
  const hasFetched = useRef(false)
  const navigate = useNavigate()
  const [requisitionstElements, setRequisitionsElements] = useState<IRequisition[]>([])
  const [requisitionsCopyElements, setrequisitionsCopyElements] = useState<IRequisition[]>([])
  const [loading, setloading] = useState(false)
  const [pagination, setpagination] = useState<any | null>(null)
  const [pageCurrent, setpageCurrent] = useState(1)
  const [search, setsearch] = useState('')

  const getNextPrevPageInventary = async ({
    page,
    save = false,
  }: {
    page: number
    save?: boolean
  }) => {
    try {
      setloading(true)
      setpageCurrent(page)
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
    let searched: IRequisition[] = []

    if (search !== '' && requisitionstElements.length !== 0) {
      /*
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

*/
      searched = [...new Set(searched)]
      console.log(searched)
    }
  }
  const columns = [
    {
      title: 'Ver candidatos',
      key: 'unitOfMeasurement',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center', columnGap: '1rem' }}>
                <Tooltip title='Editar producto'>
                  <ClipboardDocumentIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: '#039ecc',
                      fill: 'white',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/inventary/add-product', { state: { producto: record } })
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

      render: (_: any, record: IRequisition) => (
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
  return {
    //global variables

    //variables
    columns,
    requisitionsCopyElements,
    loading,
    pagination,
    pageCurrent,

    //local functions
    getNextPrevPageInventary,
    handleSearch,
    navigate,
    filterSearch,
  }
}

export default useReqisitions
