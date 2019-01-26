import React from 'react'
import Svg, {
  Defs,
  Pattern,
  Line
} from 'react-native-svg'

const ShadePattern = ({ color }) => (
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
)

export default ShadePattern
