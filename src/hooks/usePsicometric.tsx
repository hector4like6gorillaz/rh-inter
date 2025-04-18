import { useState } from 'react'
import { Tooltip, type TableColumnsType, type TableProps } from 'antd'
import P from 'src/components/paragraph/P'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']
interface DataType {
  key: React.Key
  name: string
  email: string
  puesto: string
  idOferta: number
}

const usePsicometric = () => {
  const [loading, setloading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

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
    { title: 'Puesto', dataIndex: 'puesto' },
    {
      title: 'ID Oferta',
      dataIndex: 'idOferta',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                <Tooltip title='Id de oferta'>
                  <P size='big'>{record.idOferta} </P>
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
  ]
  const dataSource = Array.from<DataType>({ length: 6 }).map<DataType>((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    email: `balan.inter.${i}@digital.mx`,
    puesto: `Gerente de contabilidad`,
    idOferta: 4392,
  }))

  console.log(selectedRowKeys)

  return {
    //local constants
    loading,
    columns,
    dataSource,
    hasSelected,
    selectedRowKeys,
    //local functions
    rowSelection,
  }
}

export default usePsicometric
