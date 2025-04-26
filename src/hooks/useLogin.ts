import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { catchError, defer, finalize, throwError } from 'rxjs'
import { postKhorLogin } from 'src/services/requisitions/requisitions.service'
import { notify, notifyError } from 'src/utilities/toastify.utilities'

const useLogin = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)

  const patchProductService = () => {
    setloading(true)
    return defer(() =>
      postKhorLogin({
        body: {
          username: 'apiRequisiciones',
          password: 'T3st4pi',
        },
      }).then((dat) => {
        return dat
      }),
    ).pipe(
      finalize(() => setloading(false)),
      catchError((e) => {
        if (e.status === 401) {
          notifyError('La sesión ha caducado. Iniciar sesión nuevamente.')
        } else {
          notifyError(
            'Ha ocurrido un error para la edicion del producto. Intentar de nuevo o contactar con soporte.',
          )
        }
        return throwError(() => e)
      }),
    )
  }
  const handlePostLoginKhorService = () => {
    patchProductService().subscribe({
      next: (login) => {
        console.log(login)
        notify('Producto editado con exito.')
        navigate('/requisitions')
      },
      error: (error) => console.error('Error al refrescar tags:', error),
    })
  }

  return {
    //local variables
    loading,
    //local functions
    handlePostLoginKhorService,
  }
}

export default useLogin
