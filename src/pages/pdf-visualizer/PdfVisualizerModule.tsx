import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const PdfVisualizerModule = () => {
  const location = useLocation()
  const { uriPdf } = location.state || {}
  const obj = {
    pdf1: 'https://storage.googleapis.com/inter-rh-dev.appspot.com/users/J7OokLdw3vhaLSa0NyljObreheq2/uploads/1742319338263000_1.pdf',
    pdf2: 'https://storage.googleapis.com/inter-rh-dev.appspot.com/carga-inicial/CONTAD~1.PDF',
  }

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
