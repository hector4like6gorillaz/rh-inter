import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NormalRoute from './NormalRoute'
import PrivateRoute from './PrivateRoute'
import LandingModule from 'src/pages/landing/LandingModule'
import LoginModule from 'src/pages/login/LoginModule'
import { HelmetProvider } from 'react-helmet-async'
import DirectoryModule from 'src/pages/directory/DirectoryModule'
import PdfVisualizerModule from 'src/pages/pdf-visualizer/PdfVisualizerModule'

import FullDescriptionModule from 'src/pages/full-description/FullDescriptionModule'
import RequisitionsModule from 'src/pages/requisitions/RequisitionsModule'
import CandidatesModule from 'src/pages/candidates/CandidatesModule'
import PsicometricModule from 'src/pages/psicometric/PsicometricModule'
import CuestionarieModule from 'src/pages/cuestionario/CuestionarieModule'
import AddCandidateToRequisition from 'src/pages/add-candidate-to-requisition/AddCandidateToRequisition'

const Router = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<NormalRoute />}>
            <Route path='/' element={<LandingModule />} />
            <Route path='/login' element={<LoginModule />} />
            <Route path='/directory' element={<DirectoryModule />} />
            <Route path='/requisitions' element={<RequisitionsModule />} />
            <Route path='/candidates' element={<CandidatesModule />} />
            <Route path='/pdf-visualizer' element={<PdfVisualizerModule />} />
            <Route path='/full-description' element={<FullDescriptionModule />} />
            <Route path='/psicometric' element={<PsicometricModule />} />
            <Route path='/cuestionarie' element={<CuestionarieModule />} />
            <Route path='/add-candidate-to-requisition' element={<AddCandidateToRequisition />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/user' element={<LandingModule />} />
          </Route>
          <Route path='*' element={<div> 404 </div>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default Router
