import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Svg, {
  Path,
  Defs,
  Pattern,
  Rect,
  Ellipse,
  Line
} from 'react-native-svg'

const Card = ({ cardinality, shape, color, style }) => {
  const Shape = shape

  return (
    <View style={ styles.card }>
      <View style={ styles.cardShapes } >
        { Array(cardinality).fill('').map((x, index) => (
          <Shape key={ index }
                 color={ color }
                 style={ style }/>
        ))}
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 150,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    margin: 3
  },
  cardShapes: {
    flex: 1,
    justifyContent: 'center'
  }
})
