import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight
} from 'react-native'
import Svg, {
  Path,
  Defs,
  Pattern,
  Rect,
  Ellipse,
  Line
} from 'react-native-svg'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.Shape = props.shape
  }

  render() {
    return (
      <TouchableHighlight style={ styles.card } onPress={ () => this.props.selectCard(this.props.index) }>
        <View style={ styles.cardShapes } >
          { Array(this.props.cardinality).fill('').map((x, index) => (
            <this.Shape key={ index }
                   color={ this.props.color }
                   style={ this.props.style }/>
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
