import { Tooltip, type TableColumnsType, type TableProps } from 'antd'
import React, { useState } from 'react'
import P from 'src/components/paragraph/P'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']
interface DataType {
  key: React.Key
  name: string
  email: string
  puesto: string
  idOferta: number
}

const questions = [
  {
    question: 'Cuales son las principales diferencias entre las?',
    respuesta:
      'La se enfoca en reconocimiento y valuacion inicial de los inventarios, mientras que la aborda el reconocimiento y valuacion de propiedades, planta y equipo. La primera se relaciona con activos de corta duracion, mientras que la segunda con activos de larga duracion.',
  },
  {
    question: 'Cuales son las principales diferencias entre las?',
    respuesta:
      'La se enfoca en reconocimiento y valuacion inicial de los inventarios, mientras que la aborda el reconocimiento y valuacion de propiedades, planta y equipo. La primera se relaciona con activos de corta duracion, mientras que la segunda con activos de larga duracion.',
  },
  {
    question: 'Cuales son las principales diferencias entre las?',
    respuesta:
      'La se enfoca en reconocimiento y valuacion inicial de los inventarios, mientras que la aborda el reconocimiento y valuacion de propiedades, planta y equipo. La primera se relaciona con activos de corta duracion, mientras que la segunda con activos de larga duracion.',
  },
]

const useCuestionario = () => {
  const [loading, setloading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columnsCuestionarie: any = [
    {
      title: 'Pregunta',
      dataIndex: 'question',
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

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  const columns: TableColumnsType<DataType> = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
  ]
  const dataSource = Array.from<DataType>({ length: 6 }).map<DataType>((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    email: `balan.inter.${i}@digital.mx`,
    puesto: `Gerente de contabilidad`,
    idOferta: 4392,
  }))
  return {
    //local variables
    loading,
    columnsCuestionarie,
    questions,
    columns,
    dataSource,
    hasSelected,
    selectedRowKeys,
    //local functions
    rowSelection,
  }
}

export default useCuestionario
