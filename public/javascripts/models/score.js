import { CELL_SCORE, BONUS_SCORE } from '../constants/index.js'

class Score {
  constructor ({ score }) {
    this.score = score || 0
  }

  increment () {
    this.score += CELL_SCORE
  }

  bonus () {
    this.score += BONUS_SCORE
  }

  in (values) {
    return values.includes(this.score)
  }

  toJSON () {
    const { score } = this

    return { score }
  }
}

export default Score
