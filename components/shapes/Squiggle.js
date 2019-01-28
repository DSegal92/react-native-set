import React from 'react'
import Svg, {
  Path,
} from 'react-native-svg'
import ShadePattern from './ShadePattern'

const Squiggle = ({ style, color, fillStyle, fillOpacity }) => {
  return (
    <Svg width="100%" height="45" viewBox="-20 0 800 400">
      <ShadePattern color={ color }/>
      <Path
          d="M0,266.963S13.5-38.385,321.862,82.6C654.607,213.163,666.911-101.212,746.237,103.21c-0.1.092,32.1,163.538-90.7,223.539-101.542,49.613-126.193,82.821-312.028,15.185-38.684-14.079-135.094-19.912-191.495,27.621C152.011,369.555.126,510.117,0,266.963Z"
          stroke={ color }
          fill={ fillStyle }
          fillOpacity={ fillOpacity }
          strokeWidth="20"
          scale=".95"
      />
    </Svg>
  )
}

export default Squiggle
