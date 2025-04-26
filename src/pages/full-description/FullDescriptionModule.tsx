import { useLocation } from 'react-router-dom'

import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import ReactMarkdown from 'react-markdown'

const FullDescriptionModule = () => {
  const location = useLocation()
  const { fullDescription } = location.state || {}

  return (
    <MainLayout
      showLeftPanel={false}
      tabTitle='Inter - Descripción completa'
      titleNavBar='Descripción completa del puesto'
    >
      <ReactMarkdown>{fullDescription}</ReactMarkdown>
    </MainLayout>
  )
}

export default FullDescriptionModule
