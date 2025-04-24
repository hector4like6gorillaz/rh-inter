import { PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Button, Spin, Table } from 'antd'
import Search from 'antd/es/input/Search'
import style from 'src/components/directory-table/directorytable.module.scss'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import useDirectory from 'src/hooks/useDirectory'

const AddCandidateToRequisition = () => {
  const {
    addCandidateSelected,
    filteredSearch,
    search,
    loading,
    columnsAddCandidate,
    handleSearch,
    doFilterSearch,
    restartFilter,
  } = useDirectory()
  return (
    <MainLayout
      showLeftPanel={false}
      tabTitle='Inter - Añadir candidatos a requisición'
      titleNavBar='Añadir candidatos a requisición'
    >
      <div className={`${style['container-div-table']}`}>
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

        <Spin spinning={loading}>
          <div className={`${style['container-div-table']}`}>
            <Table
              dataSource={filteredSearch}
              columns={columnsAddCandidate({ add: true })}
              rowKey={'id'}
              pagination={{
                showSizeChanger: false,
              }}
            />
            <div className={`${style['button-container']}`}>
              <Button
                disabled={addCandidateSelected.length === 0}
                iconPosition='end'
                icon={
                  <PaperAirplaneIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: 'white',
                      cursor: 'pointer',
                    }}
                  />
                }
                type='primary'
              >
                Añadir candidatos
              </Button>
            </div>
            <Table
              dataSource={addCandidateSelected}
              columns={columnsAddCandidate({ add: false })}
              rowKey={'name'}
              pagination={{
                showSizeChanger: false,
              }}
            />
          </div>
        </Spin>
      </div>
    </MainLayout>
  )
}

export default AddCandidateToRequisition
