import React from 'react'
import Styles from './Styles'
import ShadePattern from './ShadePattern'

const ShapeContainer = ({ children, color, style }) => {
  fillStyle = () => {
    if (style == Styles.SHADED) { return 'url(#ShadedPattern)' }
    if (style == Styles.FILLED) { return color }
  }

  fillOpacity = () => {
    if (style == Styles.OUTLINED) { return 0 }
  }

  return (
    React.cloneElement(children,
                       { color: color,
                         fillStyle: fillStyle(),
                         fillOpacity: fillOpacity()} )
  )
}

export default ShapeContainer
