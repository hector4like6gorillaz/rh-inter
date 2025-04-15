import style from './directorytable.module.scss'
import { Table } from 'antd'
import Search from 'antd/es/input/Search'
import useDirectory from 'src/hooks/useDirectory'

const DirectoryTable = () => {
  const {
    columns,
    productElements,
    loading,
    pagination,
    getNextPrevPageInventary,
    pageCurrent,
    handleSearch,
    navigate,
  } = useDirectory()
  return (
    <div className={`${style['container-div-table']}`}>
      <Search
        placeholder='Buscar por empresa, nombre, últimos estudios, puesto actual o empresa actual'
        enterButton='Buscar'
        size='large'
        loading={false}
      />
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Table
          dataSource={productElements}
          columns={columns}
          loading={false}
          scroll={{ x: 'max-content' }}
          rowKey={'id'}
          pagination={{
            //simple: isMovile,
            //current: pageCurrent,
            showSizeChanger: false,
            total: pagination?.totalItems,
            onChange: (page: number, _pageSize: number) => {
              //getNextPrevPageInventary({ page, save: true })
            },
          }}
        />
      </div>
      {/*
      {pagination !== null && (
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <P>
            Results {pagination?.currentPage} to {pagination?.currentPage * pagination?.perPage} of{' '}
            {pagination.totalItems}
          </P>
        </div>
      )}
              */}
    </div>
  )
}

export default DirectoryTable
