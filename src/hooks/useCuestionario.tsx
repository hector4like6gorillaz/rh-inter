import { type TableColumnsType, type TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ICandidate } from 'src/interfaces/candidates-interface'
import { IExam } from 'src/interfaces/requisitions-interfaces'
import { postSendEmailCuestionarie } from 'src/services/candidatos/cadidatos.services'
import { catchError, defer, throwError } from 'rxjs'
import { notify, notifyError } from 'src/utilities/toastify.utilities'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

const useCuestionario = () => {
  const location = useLocation()
  const { exam, candidates, idOferta, puesto } = location.state || {}
  console.log(puesto)

  //console.log(exam, candidates, idOferta, puesto)
  const [loading, setloading] = useState(false)
  const [cuestionaire, setcuestionaire] = useState<IExam[] | null>(null)
  const [candidatesNameEmailList, setcandidatesNameEmailList] = useState<ICandidate[] | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columnsCuestionarie: any = [
    {
      title: 'Pregunta',
      dataIndex: 'pregunta',
      width: '30%',
      key: 'question',
    },
    {
      title: 'Respuesta sugerida',
      dataIndex: 'respuesta',
      width: '70%',
      key: 'respuesta',
    },
  ]

  const postSendEmailCuestionarieService = () => {
    setloading(true)
    return defer(() =>
      postSendEmailCuestionarie({
        idOferta,
        vacante: puesto,
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

  const handlePostCandidateToRequisitionService = () => {
    postSendEmailCuestionarieService().subscribe({
      next: () => {
        notify('Correo(s) enviado(s) con exito')
        setloading(false)
      },
      error: (e) => {
        console.error('Error al ingresar al intentar mandar los correos:', e)
        setloading(false)
        if (e.status === 401) {
          notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
        } else {
          notifyError(
            'Ha ocurrido un error al intentar enviar los correos a los candidatos. Contactar con soporte.',
          )
        }
      },
    })
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
  ]

  useEffect(() => {
    if (exam !== null && candidates !== null) {
      setcuestionaire(exam)
      setcandidatesNameEmailList(candidates)
    }

    return () => {}
  }, [])

  return {
    //local variables
    loading,
    columnsCuestionarie,
    columns,
    hasSelected,
    selectedRowKeys,
    cuestionaire,
    puesto,
    candidatesNameEmailList,
    rowSelection,
    //local functions
    handlePostCandidateToRequisitionService,
  }
}

export default useCuestionario

/*
{
          "email": element.email,
          "nombre": element.name,
        }
*/
