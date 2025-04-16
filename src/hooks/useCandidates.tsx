import { DocumentMagnifyingGlassIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { candidatesData } from 'src/constants/canddates-constants'
import { IRequisition } from 'src/interfaces/requisitions-interfaces'
import { notifyError } from 'src/utilities/toastify.utilities'

const useCandidates = () => {
  const location = useLocation()
  const { requisition } = location.state || {}
  const fullDescription = `Gerente de Contabilidad

Interprotección busca un Gerente de Contabilidad altamente motivado y experimentado para supervisar y gestionar todos los aspectos de la contabilidad financiera. El candidato ideal tendrá un sólido conocimiento de los principios contables, las Normas de Información Financiera (NIF) y las mejores prácticas de la industria. El puesto reporta al Director Financiero y juega un papel crucial en el aseguramiento de la precisión, integridad y oportunidad de los reportes financieros de la compañía.

Responsabilidades:

Preparación, registro y control del Flujo de Caja.

Administración y control de las cuentas bancarias.

Identificación, registro, administración y control de contratos con clientes y proveedores.

Preparación y control del presupuesto financiero.

Generación de controles que garanticen la gestión ordenada de las operaciones de las sociedades administradas.

Identificación, registro y control de las operaciones intercompañías.

Supervisión y coordinación de la generación de información de estados financieros de empresas asociadas.

Administración, seguimiento y control de los pasivos financieros.

Generación de los estados financieros y principales cédulas analíticas, de forma mensual y anual relativas a los clientes, proveedores y acreedores.

Aseguramiento de la aplicación de las Normas de Información Financiera adoptadas por la administración.

Habilidades y cualificaciones:

Licenciatura en Contabilidad o área afín.

Sólido conocimiento de los principios contables y las NIF.

Experiencia comprobable en un puesto similar (mínimo 5 años).

Dominio de software de contabilidad y hojas de cálculo.

Fuertes habilidades analíticas y de resolución de problemas.

Excelentes habilidades de comunicación oral y escrita.

Capacidad para trabajar de forma independiente y como parte de un equipo.`
  const [requisitionData, setrequisitionData] = useState<IRequisition | null>(null)
  const hasFetched = useRef(false)
  const navigate = useNavigate()
  const [candidatesElements, setCandidatesElements] = useState<any[]>(candidatesData)
  const [loading, setloading] = useState(false)

  const [pageCurrent, setpageCurrent] = useState(1)
  const [search, setsearch] = useState('')
  const [resumenCandidato, setresumenCandidato] = useState('')
  const [showModal, setshowModal] = useState(false)

  const closeModal = () => setshowModal(false)
  const getNextPrevPageInventary = async ({
    page,
    save = false,
  }: {
    page: number
    save?: boolean
  }) => {
    try {
      setloading(true)
      setpageCurrent(page)
      //const dat = await getPokemonById({ page, search }) // esperar la promesa
      const dat = 2
      return dat
    } catch (e: any) {
      if (e.status === 401) {
        notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
        //cleanToken()
      } else {
        notifyError('Ha ocurrido un error al cargar la lista de pacientes. Contactar con soporte.')
      }
      console.log(e)
      throw e // lanzar el error para que rxjs pueda capturarlo
    } finally {
      setloading(false)
    }
  }
  const handleSearch = (search: string) => {
    setsearch(search)
  }

  const columns: any = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pdf',
      dataIndex: 'pfd',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                <Tooltip title='CV candidato'>
                  <DocumentMagnifyingGlassIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: '#039ecc',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/pdf-visualizer', { state: { uriPdf: record.pdf } })
                    }}
                  />
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
    {
      title: 'Cuestionario',
      dataIndex: 'cuestionario',
      key: 'cuestionario',
    },
    {
      title: 'Psicométricos',
      dataIndex: 'psicometrico',
      key: 'psicometrico',
    },
    {
      title: 'Resumen Candidato',
      key: 'resumen',
      render: (_: any, record: any) => (
        <>
          {(() => {
            return (
              <div style={{ display: 'flex', columnGap: '1rem', justifyContent: 'center' }}>
                <Tooltip title='Resumen del candidato'>
                  <EyeIcon
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      stroke: '#039ecc',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setshowModal(true)
                      setresumenCandidato(
                        'El candidato tiene experiencia trabajando en tal y tales partes asi como tambien aqui y haya para poder ejercer el puesto que esta solicitando en esta empresa.',
                      )
                    }}
                  />
                </Tooltip>
              </div>
            )
          })()}
        </>
      ),
    },
  ]

  useEffect(() => {
    if (requisition !== undefined && requisition !== null) {
      setrequisitionData(requisition)
    }
    return () => {}
  }, [requisition])

  return {
    //global variables

    //variables
    columns,
    candidatesElements,
    loading,
    pageCurrent,
    requisitionData,
    resumenCandidato,
    showModal,
    fullDescription,
    //local functions
    getNextPrevPageInventary,
    handleSearch,
    navigate,
    closeModal,
  }
}

export default useCandidates
