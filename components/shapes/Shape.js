import React from 'react'
import Svg, {
  Rect
} from 'react-native-svg'
import ShadePattern from './ShadePattern'
import Diamond from './Diamond'

import Styles from './Styles'

const Shape = ({ style, color, shape }) => {
  fillStyle = () => {
    if (style == Styles.SHADED) {
      return 'url(#ShadedPattern)'
    }
    if (style == Styles.FILLED) {
      return color
    }
  }

  fillOpacity = () => {
    if (style == Styles.OUTLINED) { return 0 }
  }

  ActualShape = () => {
    let UseShape = shape

    return (
      <UseShape
        fill={ fillStyle() }
        fillOpacity={ fillOpacity() }
        color={ color }
      />
    )
  }

  return (
    <Svg width="100%" height="45" viewBox="0 0 800 400">
      <ShadePattern color={ color }/>
      <ActualShape />
    </Svg>
  )
}

export default Shape
