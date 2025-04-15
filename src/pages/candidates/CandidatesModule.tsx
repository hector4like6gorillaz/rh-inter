import style from './candidates.module.scss'
import { Button } from 'antd'
import CandidatesTable from 'src/components/candidates-table/CandidatesTable'
import P from 'src/components/paragraph/P'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const CandidatesModule = () => {
  //navigate('/inventary/add-product', { state: { producto: record } })
  return (
    <MainLayout
      tabTitle='Inter - Candidatos'
      showLeftPanel={false}
      titleNavBar='Candidatos de Gerente de contabilidad'
    >
      <div className={`${style['candidates-container-module']}`}>
        <P size='big'>Puesto a cubrir: {'Gereente de contabilidad'} </P>
        <P size='big'>Descripción del puesto: </P>
        <P>
          {' '}
          Buscamos un Gerente de Contabilidad con experiencia en control de flujo de caja,
          administración bancaria, gestión de contratos y preparación de presupuestos. Debe ser
          experto en NIF y asegurar la precisión de los estados financieros.
        </P>
        <div className={`${style['buttons-bar-container']}`}>
          <div className={`${style['buttons-mini-div']}`}>
            <Button size='large' type='primary'>
              Descripción Completa
            </Button>
            <Button size='large' type='primary'>
              Cuestionario
            </Button>
            <Button size='large' type='primary'>
              Psicométrico
            </Button>
          </div>
          <Button size='large' type='primary'>
            Añadir Candidato
          </Button>
        </div>
        <CandidatesTable />
      </div>
    </MainLayout>
  )
}

export default CandidatesModule
