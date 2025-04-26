import { Fragment } from 'react'
import DirectoryTable from 'src/components/directory-table/DirectoryTable'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const DirectoryModule = () => {
  return (
    <MainLayout tabTitle='Inter - Directorio' titleNavBar='Directorio' backNavBar={false}>
      <Fragment>
        <DirectoryTable />
      </Fragment>
    </MainLayout>
  )
}

export default DirectoryModule
