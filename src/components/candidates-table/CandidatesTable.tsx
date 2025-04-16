import { Table } from 'antd'
import Search from 'antd/es/input/Search'
import style from './candidates-table.module.scss'

const CandidatesTable = ({
  candidatesElements,
  columns,
}: {
  candidatesElements: any
  columns: any
}) => {
  return (
    <div className={`${style['container-table-candidates']}`}>
      <Search
        placeholder='Buscar por empresa, nombre, últimos estudios, puesto actual o empresa actual'
        enterButton='Buscar'
        size='large'
        loading={false}
      />
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Table
          dataSource={candidatesElements}
          columns={columns}
          loading={false}
          scroll={{ x: 'max-content' }}
          rowKey={'id'}
          pagination={{
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  )
}

export default CandidatesTable
