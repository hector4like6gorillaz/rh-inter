import { DocumentArrowUpIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import style from './directorytable.module.scss'
import { Button, Spin, Table } from 'antd'
import Search from 'antd/es/input/Search'
import useDirectory from 'src/hooks/useDirectory'

const DirectoryTable = () => {
  const {
    columns,
    filteredSearch,
    search,
    loading,
    inputRef,
    handleSearch,
    doFilterSearch,
    restartFilter,
    handleFileChange,
    handleCandidatesService,
  } = useDirectory()

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <Spin spinning={loading}>
      <div className={`${style['container-div-table']}`}>
        <div className={`${style['button-container']}`}>
          <input
            ref={inputRef}
            accept='application/pdf'
            type='file'
            className={`${style['input-file-props']}`}
            onChange={handleFileChange}
          />

          <Button
            type='primary'
            size='large'
            iconPosition='end'
            icon={
              <DocumentArrowUpIcon
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  stroke: 'white',
                  cursor: 'pointer',
                }}
              />
            }
            onClick={handleButtonClick}
          >
            Cargar Cv
          </Button>
          <Button
            type='primary'
            size='large'
            icon={
              <ArrowPathIcon
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  stroke: 'white',
                  cursor: 'pointer',
                }}
              />
            }
            onClick={handleCandidatesService}
          ></Button>
        </div>
        <Search
          placeholder='Buscar por empresa, nombre, últimos estudios, puesto actual o empresa actual'
          enterButton='Buscar'
          size='large'
          loading={false}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={doFilterSearch}
          value={search}
          suffix={
            <XCircleIcon
              onClick={() => {
                if (search !== '') {
                  handleSearch('')
                  restartFilter()
                }
              }}
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
            dataSource={filteredSearch}
            columns={columns}
            loading={false}
            //scroll={{ x: 'max-content' }}
            rowKey={'id'}
            pagination={{
              showSizeChanger: false,
            }}
          />
        </div>
      </div>
    </Spin>
  )
}

export default DirectoryTable
