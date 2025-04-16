import { Form } from 'antd'
import Input from 'antd/es/input/Input'
import { Fragment } from 'react'
import MainLayout from 'src/HOCs/MainLayout/MainLayout'

const PsicometricModule = () => {
  return (
    <MainLayout showLeftPanel={false} titleNavBar='Psicometrico' tabTitle='Inter - Psicometrico'>
      <Fragment>
        <Form>
          <Input size='large' />
        </Form>
      </Fragment>
    </MainLayout>
  )
}

export default PsicometricModule
