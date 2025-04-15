import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import P from '../paragraph/P'
import style from './header.module.scss'
import { useNavigate } from 'react-router-dom'

const HeaderTitleBar = ({
  title = 'Sin titulo',
  back = true,
}: {
  title?: string
  back?: boolean
}) => {
  const navigate = useNavigate()
  return (
    <div className={`${style['container-bar']}`}>
      {back && <ArrowLeftIcon className={`${style['icon-back']}`} onClick={() => navigate(-1)} />}
      <P size='big'>{title} </P>
    </div>
  )
}

export default HeaderTitleBar
