import { Table } from 'antd'
import Search from 'antd/es/input/Search'
import style from './requisitions.module.scss'
import useReqisitions from 'src/hooks/useReqisitions'
import { XCircleIcon } from '@heroicons/react/24/outline'

const RequisitionsTable = () => {
  const {
    search,
    columns,
    requisitionsCopyElements,
    handleSearch,
    filterSearch,
    navigateToRequisition,
  } = useReqisitions()
  return (
    <div className={`${style['requisitions-div-container']}`}>
      <Search
        placeholder='Buscar por lider, puesto a cubrir, solicitante y areas de relación'
        enterButton='Buscar'
        size='large'
        loading={false}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={filterSearch}
        value={search}
        suffix={
          <XCircleIcon
            onClick={() => search !== '' && handleSearch('')}
            style={{
              cursor: search !== '' ? 'pointer' : 'default',
              opacity: search !== '' ? 1 : 0,
              width: '2rem',
              stroke: '#039ecc',
            }}
          />
        }
      />
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Table
          dataSource={requisitionsCopyElements}
          columns={columns}
          loading={false}
          rowKey={'idOferta'}
          rowClassName={() => style['clickable-row']}
          onRow={(record) => {
            return {
              onClick: () => {
                navigateToRequisition({ record })
              },
            }
          }}
          pagination={{
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  )
}

export default RequisitionsTable
