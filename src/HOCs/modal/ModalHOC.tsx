import { XMarkIcon } from '@heroicons/react/24/outline'
import style from './modal.module.scss'
import { JSX } from 'react'

const ModalHOC = ({
  children,
  closeIcon,
  movileTop = false,
}: {
  movileTop?: boolean
  closeIcon?: () => void
  children: JSX.Element
}) => {
  return (
    <div className={`${style['container-modal']} ${movileTop && style['movile-top']}`}>
      <div className={`${style['content-div-modal']}`}>
        <XMarkIcon
          className={`${style['x-close-icon']}`}
          onClick={() => closeIcon && closeIcon()}
        />
        {children}
      </div>
    </div>
  )
}

export default ModalHOC
