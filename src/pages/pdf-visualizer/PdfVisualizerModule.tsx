import { Fragment } from 'react'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const PdfVisualizerModule = () => {
  const obj = {
    pdf1: 'https://storage.googleapis.com/inter-rh-dev.appspot.com/users/J7OokLdw3vhaLSa0NyljObreheq2/uploads/1742319338263000_1.pdf',
    pdf2: 'https://storage.googleapis.com/inter-rh-dev.appspot.com/carga-inicial/CONTAD~1.PDF',
  }

  return (
    <MainLayout titleNavBar='Visualizador pdf' showLeftPanel={false} padding={false}>
      <Fragment>
        <div style={{ width: '100%', height: '100vh' }}>
          <iframe
            src={obj.pdf2}
            title='Visor PDF'
            width='100%'
            height='99%'
            style={{ border: 'none' }}
          />
        </div>
      </Fragment>
    </MainLayout>
  )
}

export default PdfVisualizerModule
