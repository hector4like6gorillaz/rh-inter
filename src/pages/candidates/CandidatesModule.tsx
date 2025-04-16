import style from './candidates.module.scss'
import { Button } from 'antd'

import CandidatesTable from 'src/components/candidates-table/CandidatesTable'
import P from 'src/components/paragraph/P'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import ModalHOC from 'src/HOCs/modal/ModalHOC'
import useCandidates from 'src/hooks/useCandidates'

const CandidatesModule = () => {
  const {
    requisitionData,
    resumenCandidato,
    candidatesElements,
    columns,
    showModal,
    fullDescription,
    closeModal,
    navigate,
  } = useCandidates()
  return (
    <MainLayout
      tabTitle='Inter - Candidatos'
      showLeftPanel={false}
      titleNavBar={`Candidatos para ${requisitionData?.puestoACubrir}`}
      modal={
        <ModalHOC closeIcon={closeModal}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <P size='big'>Candidato {'MIGUEL ANGEL DIAZ SANCHEZ'}</P>
            <P>{resumenCandidato}</P>
          </div>
        </ModalHOC>
      }
      showModal={showModal}
    >
      <div className={`${style['candidates-container-module']}`}>
        <P size='big'>Puesto a cubrir: {`${requisitionData?.puestoACubrir}`} </P>
        <P size='big'>Descripción del puesto: </P>
        <P>
          Buscamos un Gerente de Contabilidad con experiencia en control de flujo de caja,
          administración bancaria, gestión de contratos y preparación de presupuestos. Debe ser
          experto en NIF y asegurar la precisión de los estados financieros.
        </P>
        <div className={`${style['buttons-bar-container']}`}>
          <div className={`${style['buttons-mini-div']}`}>
            <Button
              size='large'
              type='primary'
              onClick={() => navigate('/full-description', { state: { fullDescription } })}
            >
              Descripción Completa
            </Button>
            <Button size='large' type='primary'>
              Cuestionario
            </Button>
            <Button size='large' type='primary' onClick={() => navigate('/psicometric')}>
              Psicométrico
            </Button>
          </div>
          <Button size='large' type='primary'>
            Añadir Candidato
          </Button>
        </div>
        <CandidatesTable candidatesElements={candidatesElements} columns={columns} />
      </div>
    </MainLayout>
  )
}

export default CandidatesModule
