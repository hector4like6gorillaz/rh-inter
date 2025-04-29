import { useEffect, useState } from 'react'
import { Tooltip, type TableColumnsType, type TableProps } from 'antd'
import P from 'src/components/paragraph/P'
import { useLocation } from 'react-router-dom'
import { catchError, defer, throwError } from 'rxjs'
import { postSendPsicometric } from 'src/services/candidatos/cadidatos.service'
import { ICandidate } from 'src/interfaces/candidates-interface'
import { notify, notifyError } from 'src/utilities/toastify.utilities'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

const usePsicometric = () => {
  const location = useLocation()
  const { candidates, puesto } = location.state || {}
  const [loading, setloading] = useState(false)
  const [code, setcode] = useState('')
  const [candidatesNameEmailList, setcandidatesNameEmailList] = useState<ICandidate[] | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const postSendEmailService = () => {
    setloading(true)
    return defer(() =>
      postSendPsicometric({
        vacante: puesto,
        codigoExamen: '12345',
        candidatos: candidatesNameEmailList!
          .filter((item) => selectedRowKeys.includes(item.email))
          .map((item) => ({
            nombre: item.name,
            email: item.email,
          })),
      }).then((dat) => {
        return dat
      }),
    ).pipe(
      catchError((e) => {
        return throwError(() => e)
      }),
    )
  }

  const handlePostSendEmailService = () => {
    postSendEmailService().subscribe({
      next: () => {
        setloading(false)
        notify('Correo(s) enviado(s) exitosamente.')
      },
      error: (error) => {
        notifyError('Error al intentar enviar correos, reintentar o contactar con soporte.')
        console.error('Error al refrescar directorio:', error)
        setloading(false)
      },
    })
  }

  const disabledButton = () => {
    let disabled = true
    if (selectedRowKeys.length !== 0 && code !== '') disabled = false

    return disabled
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<ICandidate> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  const columns: TableColumnsType<ICandidate> = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Puesto actual',
      dataIndex: 'puesto',
      render: (_: any, record: ICandidate) => (
        <>
          {(() => {
            return (
              <div>
                <Tooltip title='Id de oferta'>
                  <P>{record.currentRole} </P>
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
  ]

  useEffect(() => {
    if (candidates !== null) {
      setcandidatesNameEmailList(candidates)
    }

    return () => {}
  }, [])

  return {
    //local constants
    loading,
    columns,
    hasSelected,
    selectedRowKeys,
    candidatesNameEmailList,
    puesto,
    code,
    //local functions
    rowSelection,
    disabledButton,
    setcode,
    handlePostSendEmailService,
  }
}

export default usePsicometric
