import { Fragment, JSX, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import style from './main.module.scss'
import { IMetaData } from 'src/interfaces/metadata-interface'
import HeaderTitleBar from 'src/components/header/HeaderTitleBar'
import LeftNavPanel from 'src/components/left-panel/LeftNavPanel'

const MainLayout = ({
  children,
  showFooter = true,
  showNavBar = true,
  tabTitle = 'Inter',
  showModal,
  modal,
  padding = true,
  metaData = {
    firstDesc: 'Bienvenido a la página principal de nuestro sitio web.',
    pageName: 'Inicio | Ale Bella',
    secondDescription:
      'Explora nuestra página principal y descubre todo lo que tenemos para ofrecer.',
    urlDir: 'https://nexusale-bella.com/',
    otherDesc: 'Vista previa del sitio principal',
    twiterDesc: 'Explora nuestra página principal y descubre todo lo que tenemos para ofrecer.',
  },
  titleNavBar = 'Sin titulo',
  backNavBar,
  showLeftPanel = true,
}: {
  children?: JSX.Element
  showFooter?: boolean
  showNavBar?: boolean
  tabTitle?: string
  metaData?: IMetaData
  showModal?: boolean
  modal?: JSX.Element
  padding?: boolean

  titleNavBar?: string
  backNavBar?: boolean
  showLeftPanel?: boolean
}) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className={`${style['container-panel-main']} `}>
      <Helmet>
        <title>{tabTitle} </title>
        <meta name='description' content={metaData.firstDesc} />
      </Helmet>
      {showNavBar && <HeaderTitleBar back={backNavBar} title={titleNavBar} />}
      <div className={`${style['container-module']} `}>
        {showLeftPanel && <LeftNavPanel />}
        <div className={`${style['container-module-right']} ${padding && style['div-padding']}`}>
          {children}
        </div>
      </div>
      {showFooter && <></>}
      {showModal && modal && <Fragment>{modal}</Fragment>}
    </div>
  )
}

export default MainLayout
