import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Button, Form, Spin, Table } from 'antd'
import Input from 'antd/es/input/Input'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import usePsicometric from 'src/hooks/usePsicometric'

const PsicometricModule = () => {
  const {
    columns,
    rowSelection,
    candidatesNameEmailList,
    puesto,
    code,
    loading,
    disabledButton,
    setcode,
    handlePostSendEmailService,
  } = usePsicometric()
  {
  }

  const [form] = Form.useForm()
  return (
    <MainLayout
      titleNavBar={`Enviar Psicometrico a candidatos. Puesto: ${puesto}`}
      tabTitle='Inter - Enviar Psicometrico'
    >
      <Spin spinning={loading}>
        <Form layout={'vertical'} form={form}>
          <Form.Item
            style={{ fontSize: '2rem' }}
            label='Ingresa el codigo del psicometrico'
            name={'name'}
            rules={[{ required: true, message: 'Ingresa un codigo de psicometrico valido' }]}
          >
            <Input
              value={code}
              onChange={(e) => setcode(e.target.value)}
              size='large'
              placeholder='xxxx xxxx xxxx'
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            />
          </Form.Item>
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              rowSelection={rowSelection}
              dataSource={candidatesNameEmailList ?? []}
              columns={columns}
              scroll={{ x: 'max-content' }}
              rowKey={'email'}
              pagination={{
                showSizeChanger: false,
              }}
            />
          </div>
          <br />
          <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <Button
              disabled={disabledButton()}
              onClick={handlePostSendEmailService}
              size='large'
              type='primary'
              htmlType='submit'
              iconPosition='end'
              icon={<PaperAirplaneIcon style={{ height: '1.5rem' }} />}
            >
              Enviar Psicometrico
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </MainLayout>
  )
}

export default PsicometricModule
