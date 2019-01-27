import React from 'react';
import HomeScreen from './HomeScreen'

import { createDeck } from '../lib/Deck'
import { shuffleArray } from '../lib/Utilities'


export default class HomeScreenContainer extends React.Component {
  constructor(props) {
    super(props)

    this.selectCard = this.selectCard.bind(this)
    this.inSolution = this.inSolution.bind(this)

    const deck = createDeck()

    this.state = {
      deck: shuffleArray(deck),
      selected: [],
      removed: [],
      valid: []
    }
  }

  static navigationOptions = {
    header: null,
  };

  selectCard(index) {
    if (this._cardAlreadySelected(index)) { return }

    this.setState({ ...this.state, selected: [...this.state.selected, index] }, () => {
      if (this._fewerThanThreeCardsSelected()) { return }

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

  _cardAlreadySelected(index) { return this.state.selected.indexOf(index) >= 0 }
  _fewerThanThreeCardsSelected() { return this.state.selected.length < 3 }

  validCombination(selectedCards) {
    return ['shape',
            'color',
            'cardinality',
            'style'].map(attr => this._attributeValid(selectedCards, attr))
                    .reduce((acc, x) => (acc && x), true)
  }

  _attributeValid(objects, attr) {
    uniq = Array.from(new Set(objects.map(x => x[attr]))).length
    return (uniq == 1 || uniq == objects.length)
  }

  inSolution(index) { return this.state.valid[0] && this.state.valid[0].cards.indexOf(index) >= 0 }

  solveBoard(onlyFindOne) {
    let active = this.state.deck.slice(0, 12)
    let counter = 0
    valid = []

    for(let i = 0; i < active.length; i++) {
      for(let j = i+1; j < active.length; j++) {
        for(let k = j+1; k < active.length; k++) {
          if (this.validCombination([active[i], active[j], active[k]])) {
            valid.push({ id: counter++, cards: [i, j, k]})

            if (onlyFindOne) { return valid }
          }
        }
      }
    }

    return valid
  }


  render() {
    return (
      <HomeScreen
        deck={ this.state.deck }
        inSolution={ this.inSolution }
        selectCard={ this.selectCard }
        selected={ this.state.selected }
        findSolution={  () => { this.setState({ ...this.state, valid: this.solveBoard(true) }) } }
        shuffle={ () => { this.setState({ ...this.state, deck: shuffleArray(this.state.deck), valid: [] })}  }
      />
    );
  }
}
