import { Table } from 'antd'
import Search from 'antd/es/input/Search'
import React, { Fragment } from 'react'
import style from './requisitions.module.scss'
import useReqisitions from 'src/hooks/useReqisitions'

const RequisitionsTable = () => {
  const {
    columns,
    requisitionsCopyElements,
    loading,
    pagination,
    getNextPrevPageInventary,
    pageCurrent,
    handleSearch,
    navigate,
    filterSearch,
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
      />
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Table
          dataSource={requisitionsCopyElements}
          columns={columns}
          loading={false}
          scroll={{ x: 'max-content' }}
          rowKey={'idOferta'}
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

export default RequisitionsTable
