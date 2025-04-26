import {
  ArrowRightStartOnRectangleIcon,
  IdentificationIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import SelectOption from '../select-option/SelectOption'
import style from './left.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import P from '../paragraph/P'
import logo from 'src/assets/logo.png'
import useNavBar from 'src/hooks/useNavBar'

const navOptions = [
  {
    title: 'Requisiciones',
    compare: 'requisitions',
    icon: ClipboardDocumentCheckIcon,
    uri: '/requisitions',
  },
  { title: 'Directorio', compare: 'directory', icon: IdentificationIcon, uri: '/directory' },
]

const LeftNavPanel = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { barState, handleCollapseBar } = useNavBar()

  const getPathSelected = (title: string) => {
    let filterPath = pathname.replaceAll('-', ' ')
    let itsCorrect = false

    if (title !== '' && filterPath.includes(title.toLowerCase())) itsCorrect = true
    else if (filterPath === '/' && title === '') itsCorrect = true

    return itsCorrect
  }

  return (
    <div
      className={`${style['left-container-div']} ${barState ? style['min-widh-true'] : style['min-widh-false']}`}
    >
      <div className={`${style['div-logo-container']}`}>
        <img src={logo} className={`${style['logo-props']}`} onClick={handleCollapseBar} />
        {!barState && <P>Inter</P>}
      </div>
      <div className={`${style['div-flex-column-options']} ${barState && style['aling-center']}`}>
        {navOptions.map((item, index) => {
          const { icon, uri, title, compare } = item
          const isSelected = getPathSelected(compare)

          return (
            <Fragment key={index}>
              <SelectOption
                showLabels={!barState}
                selected={isSelected}
                Icon={icon}
                label={title}
                onClick={() => navigate(uri)}
              />
            </Fragment>
          )
        })}
      </div>
      <div
        className={`${style['div-logo-container']} ${style['color-red']}`}
        //onClick={() => cleanToken()}
      >
        <div className={`${style['logo-props']}`}>
          <ArrowRightStartOnRectangleIcon className={`${style['logo-props']}`} />
        </div>
        {!barState && <P>Log out</P>}
      </div>
    </div>
  )
}

export default LeftNavPanel
