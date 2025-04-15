import { DocumentArrowUpIcon } from '@heroicons/react/24/solid'
import { FloatButton } from 'antd'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import DirectoryTable from 'src/components/directory-table/DirectoryTable'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const DirectoryModule = () => {
  const navigate = useNavigate()
  return (
    <MainLayout tabTitle='Inter - Directorio' titleNavBar='Directorio' backNavBar={false}>
      <Fragment>
        <DirectoryTable />
        <FloatButton
          shape='square'
          description='Cargar Cv'
          type='primary'
          style={{ insetInlineEnd: 24 }}
          icon={<DocumentArrowUpIcon />}
          onClick={() => navigate('/pdf-visualizer')}
        />
      </Fragment>
    </MainLayout>
  )
}

export default DirectoryModule
