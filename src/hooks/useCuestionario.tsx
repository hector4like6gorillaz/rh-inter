import { type TableColumnsType, type TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ICandidate } from 'src/interfaces/candidates-interface'
import { IExam } from 'src/interfaces/requisitions-interfaces'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

const useCuestionario = () => {
  const location = useLocation()
  const { exam, candidates, idOferta, puesto } = location.state || {}

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
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
    //local functions
    rowSelection,
  }
}

export default useCuestionario
