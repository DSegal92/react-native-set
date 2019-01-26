import React from 'react'
import Svg, {
  Rect
} from 'react-native-svg'
import ShadePattern from './ShadePattern'

const Oval = ({ style, color, fillStyle, fillOpacity }) => {
  return (
    <Svg width="100%" height="45" viewBox="-120 -80 800 400">
      <ShadePattern color={ color }/>
      <Rect
        x="0"
        y="0"
        width="500"
        height="200"
        rx="100"
        ry="100"
        fill={ fillStyle }
        fillOpacity={ fillOpacity }
        strokeWidth="20"
        stroke={ color }
      />
    </Svg>
  )
}

export default Oval
