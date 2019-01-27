import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Card from '../components/Card'

const HomeScreen = ({ deck, inSolution, selected, selectCard, shuffle, findSolution }) => (
  <View style={ styles.game }>
    <View style={styles.gameBoard}>
      <View style={ styles.cardsContainer }>
        { deck.slice(0, 12).map((c, index) => (
          <Card key={ c.id }
                index={ index }
                cardinality={ c.cardinality }
                color={ c.color }
                style={ c.style }
                inSolution={ inSolution(index) }
                selected={ selected.indexOf(index) >= 0 }
                shape={ c.shape }
                selectCard={ selectCard }/>
        ))}
      </View>
    </View>
    <View style={ styles.controls }>
      <Button title="Shuffle" onPress={ shuffle } />
      <Text style={{ fontSize: 18, marginHorizontal: 20 }}>Remaining: { deck.length }</Text>
      <Button title="Solve" onPress={ findSolution } />
    </View>
  </View>
)

export default HomeScreen

const styles = StyleSheet.create({
  game: {
    flex: 1,
    alignItems: 'center',
  },
  gameBoard: {
    marginTop: 80,
    width: '100%',
    height: '80%',
    flex: 5,
    alignItems: 'center',
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    width: '93%',
    height: '80%',
    maxHeight: 650
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
