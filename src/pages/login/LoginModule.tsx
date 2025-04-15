import MainLayout from 'src/HOCs/MainLayout/MainLayout'
import style from './login.module.scss'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

import logo from 'src/assets/logo.png'


const LoginModule = () => {

  return (
    <MainLayout padding={false} showLeftPanel={false} showNavBar={false}>
      <div className={`${style['container-login']}`}>
        <img src={logo} />
        <GoogleLogin
          size='medium'
          theme='filled_blue'
          width={1000}
          onSuccess={(data: CredentialResponse) => {
            //()=>handlePatchLogin()
          }}
          onError={() => console.log('Login failed')}
        />
      </div>
    </MainLayout>
  )
}

export default LoginModule

/*
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQVBJUkVRIiwiZW1haWwiOiJhcGkuaW50ZXJAaW50ZXIubXgiLCJleHAiOjE3NDQ3NDAyODd9.1GdvXBi-2GHHn3TxszZeCmJ4maNwX8Scia8DCQ60sJQ

*/
