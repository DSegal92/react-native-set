import React from 'react'
import Svg, {
  Path,
  Defs,
  Pattern,
  Line,
  Ellipse,
  Rect
} from 'react-native-svg'

import Styles from './Styles'

const Oval = ({ style, color }) => {
  fillStyle = () => {
    if (style == Styles.SHADED) {
      return 'url(#ShadedPattern)'
    }
    if (style == Styles.FILLED) {
      return color
    }

    return '#FFF'
  }
  return (
    <Svg width="100%" height="45" viewBox="-120 -80 800 400">
      <Defs>
        <Pattern
          id="ShadedPattern"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="40"
          height="100"
          viewBox="0 0 4 10"
        >
      <Line
          x1="0"
          y1="0"
          x2="0"
          y2="200"
          stroke={ color }
          strokeWidth="2"
      />
        </Pattern>
      </Defs>

      <Rect
        x="0"
        y="0"
        width="500"
        height="200"
        rx="100"
        ry="100"
        fill={ fillStyle() }
        strokeWidth="20"
        stroke={ color }
      />
    </Svg>
  )
}

export default Oval
