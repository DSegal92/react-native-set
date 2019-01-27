import Squiggle from '../components/shapes/Squiggle'
import Diamond from '../components/shapes/Diamond'
import Oval from '../components/shapes/Oval'

import Styles from '../components/shapes/Styles'

export const createDeck = () => {
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

  return deck
}
