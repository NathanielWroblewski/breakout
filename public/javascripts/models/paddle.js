import Cell from './cell.js'
import Vector from './vector.js'
import { MOVEMENT, WIDTH, HEIGHT, PADDLE_HEIGHT, PADDLE_WIDTH } from '../constants/index.js'

const initialPosition = ({ width = PADDLE_WIDTH }) => {
  const x = Math.floor((WIDTH / 2) - (width / 2))
  const y = HEIGHT - 20

  return new Vector({ x, y })
}

class Paddle extends Cell {
  constructor (attributes) {
    super(attributes)

    this.position = attributes.position || initialPosition(attributes)
    this.height = attributes.height || PADDLE_HEIGHT
    this.width = attributes.width || PADDLE_WIDTH
  }

  left () {
    this.velocity = new Vector({ x: -MOVEMENT, y: 0 })
  }

  right () {
    this.velocity = new Vector({ x: MOVEMENT, y: 0 })
  }

  move () {
    this.position = this.position.add(this.velocity)
    this.bound()
  }

  bound () {
    if (this.position.x <= 0) {
      this.position = new Vector({ x: 0, y: this.position.y })
      this.velocity = new Vector({ x: 0, y: 0 })
    }

    if (this.position.x + this.width >= WIDTH) {
      this.position = new Vector({ x: WIDTH - this.width, y: this.position.y })
      this.velocity = new Vector({ x: 0, y: 0 })
    }
  }
}

export default Paddle
