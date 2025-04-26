import style from './candidates.module.scss'
import { Button, Spin } from 'antd'
import { Fragment } from 'react/jsx-runtime'

import CandidatesTable from 'src/components/candidates-table/CandidatesTable'
import P from 'src/components/paragraph/P'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import ModalHOC from 'src/HOCs/modal/ModalHOC'
import useCandidates from 'src/hooks/useCandidates'

const CandidatesModule = () => {
  const {
    requisitionData,
    fullRequisition,
    resumenCandidato,
    candidatesElements,
    columns,
    showModal,
    candidateNameSelected,
    loading,
    loadinInitRequisition,
    closeModal,
    navigate,
    handleRequisition,
  } = useCandidates()
  return (
    <MainLayout
      tabTitle='Inter - Candidatos'
      titleNavBar={
        requisitionData
          ? `Candidatos para  ${requisitionData?.puestoACubrir}`
          : 'No se encontraron coincidencias, iniciar requisición'
      }
      modal={
        <ModalHOC closeIcon={closeModal}>
          <div
            style={{
              display: 'flex',
              rowGap: '1rem',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <P size='big'>Candidato: {candidateNameSelected}</P>
            <P>{resumenCandidato}</P>
          </div>
        </ModalHOC>
      }
      showModal={showModal}
    >
      <Spin spinning={loading}>
        <div className={`${style['candidates-container-module']}`}>
          {requisitionData && (
            <Fragment>
              <P size='big'>Puesto a cubrir: {`${requisitionData?.puestoACubrir}`} </P>
              <P size='big'>Descripción del puesto: </P>
              <P>{fullRequisition?.descriptionShort}</P>
            </Fragment>
          )}
          {requisitionData && (
            <div className={`${style['buttons-bar-container']}`}>
              <div className={`${style['buttons-mini-div']}`}>
                <Button
                  size='large'
                  type='primary'
                  onClick={() =>
                    navigate('/full-description', {
                      state: { fullDescription: fullRequisition?.descriptionFull },
                    })
                  }
                >
                  Descripción Completa
                </Button>
                <Button
                  size='large'
                  type='primary'
                  onClick={() =>
                    navigate('/cuestionarie', {
                      state: {
                        exam: fullRequisition?.exam,
                        candidates: fullRequisition?.candidatosListFullData,
                        idOferta: fullRequisition?.idOferta,
                        puesto: requisitionData?.puestoACubrir,
                      },
                    })
                  }
                >
                  Cuestionario
                </Button>
                <Button size='large' type='primary' onClick={() => navigate('/psicometric')}>
                  Psicométrico
                </Button>
              </div>
              <Button
                size='large'
                type='primary'
                onClick={() =>
                  navigate('/add-candidate-to-requisition', {
                    state: {
                      idOferta: fullRequisition?.idOferta,
                      puesto: requisitionData.puestoACubrir,
                    },
                  })
                }
              >
                Añadir Candidato
              </Button>
            </div>
          )}
          {requisitionData && (
            <CandidatesTable candidatesElements={candidatesElements} columns={columns} />
          )}
          {!requisitionData && (
            <Fragment>
              <P size='big'>No se encontraron coincidencias.</P>
              <Button
                size='large'
                type='primary'
                onClick={handleRequisition}
                loading={loadinInitRequisition}
              >
                Iniciar Requisición
              </Button>
            </Fragment>
          )}
        </div>
      </Spin>
    </MainLayout>
  )
}

export default CandidatesModule
