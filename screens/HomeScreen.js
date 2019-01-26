import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Card from '../components/Card'
import Squiggle from '../components/shapes/Squiggle'
import Diamond from '../components/shapes/Diamond'
import Oval from '../components/shapes/Oval'

import Styles from '../components/shapes/Styles'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    const deck = []

    const shapes= [Squiggle, Diamond, Oval]
    const cardinality = [1,2,3]
    const colors = ['#ed2027', '#613394', '#03a951']
    const styles = [ Styles.SHADED, Styles.OUTLINED, Styles.FILLED ]

    for(let i = 0; i < cardinality.length; i++) {
      for(let j = 0; j < colors.length; j++) {
        for(let k = 0; k < styles.length; k++) {
          for(let l = 0; l < shapes.length; l++) {
            deck.push({ id: `${i}${j}${k}${l}`,
                        cardinality: cardinality[i],
                        color: colors[j],
                        style: styles[k],
                        shape: shapes[l] })
          }
        }
      }
    }

    this.selectCard = this.selectCard.bind(this)

    this.state = {
      deck: this.shuffleArray(deck),
      selected: [],
      removed: [],
      valid: []
    }
  }


  shuffleArray(array) {
    return array.map(a => [Math.random(), a])
                .sort((a, b) => a[0] - b[0])
                .map(a => a[1]);
  }

  static navigationOptions = {
    header: null,
  };

  selectCard(index) {
    if (this.state.selected.indexOf(index) >= 0) { return }

    this.setState({ ...this.state, selected: [...this.state.selected, index] }, () => {
      if (this.state.selected.length < 3) { return }

      selectedCards = this.state.deck.filter((_, index) =>  { return this.state.selected.indexOf(index) >= 0 } )

      if (this.validCombination(selectedCards)) {
        newDeck = this.state.deck.filter((_, index) =>  { return this.state.selected.indexOf(index) < 0 } )
        this.setState({ ...this.state,
                        deck: newDeck,
                        selected: [],
                        removed: [ ...this.state.removed, selectedCards],
                        valid: [] })
      }
      else {
        this.setState({ ...this.state, selected: [] })
      }
    })
  }

  solve(onlyFindOne) {
    let active = this.state.deck.slice(0, 12)
    let counter = 0
    valid = []

    for(let i = 0; i < active.length; i++) {
      for(let j = i+1; j < active.length; j++) {
        for(let k = j+1; k < active.length; k++) {
          if (this.validCombination([active[i], active[j], active[k]])) {
            valid.push({ id: counter++, cards: [i, j, k]})
          }
        }
      }
    }

    this.setState({ ...this.state, valid: valid })
  }

  validCombination(selectedCards) {
    let validShape = this.attributeValid(selectedCards, 'shape')
    let validColor = this.attributeValid(selectedCards, 'color')
    let validCardinality = this.attributeValid(selectedCards, 'cardinality')
    let validStyle = this.attributeValid(selectedCards, 'style')

    return [validShape,
            validColor,
            validCardinality,
            validStyle].reduce((acc, x) => (x ? acc = acc + 1 : acc), 0) == 4
    
  }

  attributeValid(objects, attr) {
    uniq = Array.from(new Set(objects.map(x => x[attr]))).length
    return (uniq == 1 || uniq == objects.length)
  }

  inSolution(index) {
    if(this.state.valid[0] && this.state.valid[0].cards.indexOf(index) >= 0) {
      return true
    }
  }

  render() {
    return (
      <View style={ styles.game }>
        <View style={styles.gameBoard}>
          <View style={ styles.cardsContainer }>
            { this.state.deck.slice(0, 12).map((c, index) => (
              <Card key={ c.id }
                    index={ index }
                    cardinality={ c.cardinality }
                    inSolution={ this.inSolution(index) }
                    color={ c.color }
                    style={ c.style }
                    selected={ this.state.selected.indexOf(index) >= 0 }
                    shape={ c.shape }
                    selectCard={ this.selectCard }/>
            ))}
          </View>
        </View>
        <View style={ styles.controls }>
          <Button title="Shuffle" onPress={ () => { this.setState({ ...this.state, deck: this.shuffleArray(this.state.deck), valid: [] })} } />
          <Text style={{ fontSize: 18, marginHorizontal: 20 }}>Remaining: {this.state.deck.length}</Text>
          <Button title="Solve" onPress={ () => { this.solve() } } />
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

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
