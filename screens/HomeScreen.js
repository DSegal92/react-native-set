import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Card from '../components/Card'
import Squiggle from '../components/shapes/squiggle'

import Styles from '../components/shapes/Styles'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    const deck = []

    const cardinality = [1,2,3]
    const colors = ['red', 'purple', 'green']
    const styles = [ Styles.SHADED, Styles.OUTLINED, Styles.FILLED ]

    for(let i = 0; i < cardinality.length; i++) {
      for(let j = 0; j < colors.length; j++) {
        for(let k = 0; k < styles.length; k++) {
          deck.push({ id: `${i}${j}${k}`,
                      cardinality: cardinality[i],
                      color: colors[j],
                      style: styles[k]})
        }
      }
    }

    this.state = {
      deck: this.shuffleArray(deck)
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

  render() {
    return (
      <View style={styles.gameBoard}>
        <View style={ styles.cardsContainer }>
          { this.state.deck.slice(0, 12).map(c => (
            <Card key={ c.id }
                  cardinality={ c.cardinality }
                  color={ c.color }
                  style={ c.style }
                  shape={ Squiggle } />
          ))}
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
  gameBoard: {
    marginTop: 80,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  cardsContainer: {
    flex: 1,
    width: '100%',
    height: '90%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap'
  },
});
