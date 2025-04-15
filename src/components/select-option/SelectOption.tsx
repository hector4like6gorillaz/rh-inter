import P from '../paragraph/P'
import style from './select.module.scss'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const SelectOption = ({
  label = 'vacio',
  Icon = UserCircleIcon,
  selected = false,
  onClick,
  showLabels = true,
}: {
  label?: string
  Icon?: any
  selected?: boolean
  onClick?: () => void
  showLabels?: boolean
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={`${style['container-base-props']} ${selected && style['selected-container']} ${showLabels ? style['width-100'] : style['width-fit']}`}
    >
      <div className={`${style['icon-props']}`}>
        <Icon className={`${style['icon-props']} ${selected && style['icon-selected']}`} />
      </div>
      {showLabels && <P>{label}</P>}
    </div>
  )
}

export default SelectOption
