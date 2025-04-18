import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Button, Form, Table } from 'antd'
import Input from 'antd/es/input/Input'
import { Fragment } from 'react'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import usePsicometric from 'src/hooks/usePsicometric'

const PsicometricModule = () => {
  const { columns, dataSource, rowSelection } = usePsicometric()

  const [form] = Form.useForm()
  return (
    <MainLayout
      showLeftPanel={false}
      titleNavBar='Enviar Psicometrico a candidatos'
      tabTitle='Inter - Enviar Psicometrico'
    >
      <Fragment>
        <Form layout={'vertical'} form={form}>
          <Form.Item
            style={{ fontSize: '2rem' }}
            label='Ingresa el codigo del psicometrico'
            name={'name'}
            rules={[{ required: true, message: 'Ingresa un correo de usuario valido' }]}
          >
            <Input
              size='large'
              placeholder='xxxx xxxx xxxx'
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            />
          </Form.Item>
          <div style={{ width: '100%', overflow: 'auto' }}>
            <Table
              rowSelection={rowSelection}
              dataSource={dataSource}
              columns={columns}
              loading={false}
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
              onClick={() => null}
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
      </Fragment>
    </MainLayout>
  )
}

export default PsicometricModule
