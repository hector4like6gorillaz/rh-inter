import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Button, Table } from 'antd'
import P from 'src/components/paragraph/P'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import useCuestionario from 'src/hooks/useCuestionario'

const CuestionarieModule = () => {
  const {
    columnsCuestionarie,
    puesto,
    rowSelection,

    columns,
    cuestionaire,
    candidatesNameEmailList,
  } = useCuestionario()
  return (
    <MainLayout
      showLeftPanel={false}
      tabTitle={`Inter - Cuestionario de ${puesto}`}
      titleNavBar={`Cuestionario de ${puesto}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '2rem' }}>
        <P size='big'>Preguntas del cuestionario</P>
        {cuestionaire !== null && (
          <Table
            dataSource={cuestionaire}
            columns={columnsCuestionarie}
            loading={false}
            rowKey={'email'}
            pagination={false}
          />
        )}
        <P size='big'>Candidatos para envio del cuestionario:</P>

        <Table
          rowSelection={rowSelection}
          dataSource={candidatesNameEmailList ?? []}
          columns={columns}
          loading={false}
          scroll={{ x: 'max-content' }}
          rowKey={'email'}
          pagination={{
            showSizeChanger: false,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            size='large'
            type='primary'
            icon={<PaperAirplaneIcon style={{ height: '1.5rem' }} />}
            iconPosition='end'
          >
            Enviar cuestionario
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default CuestionarieModule
