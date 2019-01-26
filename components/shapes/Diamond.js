import React from 'react'
import Svg, {
  Rect
} from 'react-native-svg'
import ShadePattern from './ShadePattern'

const Diamond = ({ style, color, fillStyle, fillOpacity }) => {
  return (
    <Svg width="100%" height="45" viewBox="-315 -20 800 400">
      <ShadePattern color={ color }/>
      <Rect
        x="0"
        y="0"
        width="250"
        height="250"
        fill={ fillStyle }
        fillOpacity={ fillOpacity }
        rotation="45"
        strokeWidth="20"
        stroke={ color }
      />
    </Svg>
  )
}

export default Diamond
