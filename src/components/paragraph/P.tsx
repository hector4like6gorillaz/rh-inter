import React from 'react'
import style from './p.module.scss'

const P = ({
  children,
  size = 'normal',
  classStyle,
}: {
  size?: 'small' | 'normal' | 'big'
  children?: React.ReactNode
  classStyle?: string
}) => {
  const getSize = () => {
    let sty = style[`p-${size}`]

    return sty
  }
  return <p className={`${style['p-props']} ${getSize()} ${classStyle}`}>{children}</p>
}

export default P
