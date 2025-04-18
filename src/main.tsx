import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/index.ts'
import Router from './router/Router.tsx'
import './styles/global.scss'
import '@ant-design/v5-patch-for-react-19'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

const CLIENT_ID = '618915228454-n5udfbbktkm7tuu88l202t0tuqpho5kg.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <ToastContainer />
        <Router />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
