import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight
} from 'react-native'

import ShapeContainer from './shapes/ShapeContainer'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.Shape = props.shape
  }

  highlightedStyle() {
    if (this.props.selected) {
      return { borderColor: 'yellow' }
    }
    if (this.props.inSolution) {
      return { backgroundColor: 'yellow' }
    }
    return {}
  }

  render() {
    return (
      <TouchableHighlight style={ { ...styles.card, ...this.highlightedStyle() } }
                          onPress={ () => this.props.selectCard(this.props.index) }>
        <View style={ styles.cardShapes }>
          { Array(this.props.cardinality).fill('').map((x, index) => (
            <View key={ index }>
              <ShapeContainer color={ this.props.color}
                              style={ this.props.style }>
                <this.Shape />
              </ShapeContainer>
            </View>
          ))}
        </View>
      </TouchableHighlight>
    )
  }
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
