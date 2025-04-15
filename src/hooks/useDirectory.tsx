import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import P from 'src/components/paragraph/P'
import { notifyError } from 'src/utilities/toastify.utilities'

const useDirectory = () => {
  const hasFetched = useRef(false)
  const navigate = useNavigate()
  const [productElements, setProductsElements] = useState<any[]>()
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
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Puesto Actual',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Empresa Actual',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Últimos Estudios',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ubicación',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Pdf',
      dataIndex: 'unidOfMeasurement',
      key: 'unidOfMeasurement',
    },

    {
      title: 'Fecha',
      key: 'unitOfMeasurement',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem' }}>
                <Tooltip title='Editar producto'>
                  <PencilSquareIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: 'green',
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
  ]
  return {
    //global variables

    //variables
    columns,
    productElements,
    loading,
    pagination,
    pageCurrent,

    //local functions
    getNextPrevPageInventary,
    handleSearch,
    navigate,
  }
}

export default useDirectory
