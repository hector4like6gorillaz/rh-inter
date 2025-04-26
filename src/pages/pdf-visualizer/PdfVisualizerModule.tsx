import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const PdfVisualizerModule = () => {
  const location = useLocation()
  const { uriPdf } = location.state || {}

  return (
    <MainLayout
      titleNavBar='Visualizador pdf'
      showLeftPanel={false}
      padding={false}
      tabTitle='Inter - Pdf'
    >
      <Fragment>
        <div style={{ width: '100%', height: '100%' }}>
          <iframe
            src={uriPdf}
            title='Visor PDF'
            width='100%'
            height='99.4%'
            style={{ border: 'none' }}
          />
        </div>
      </Fragment>
    </MainLayout>
  )
}

export default PdfVisualizerModule
