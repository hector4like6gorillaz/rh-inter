import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import P from 'src/components/paragraph/P'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const FullDescriptionModule = () => {
  const location = useLocation()
  const { fullDescription } = location.state || {}

  return (
    <MainLayout
      showLeftPanel={false}
      tabTitle='Inter - Descripción completa'
      titleNavBar='Descripción completa del puesto'
    >
      <Fragment>
        <P size='big'>{fullDescription}</P>
      </Fragment>
    </MainLayout>
  )
}

export default FullDescriptionModule
