import Vector from './vector.js'
import { CELL_HEIGHT, CELL_WIDTH } from '../constants/index.js'

class Cell {
  constructor ({ position, velocity, height, width }) {
    this.position = position || new Vector({ x: 0, y: 0 })
    this.velocity = velocity || new Vector({ x: 0, y: 0 })
    this.height = height || CELL_HEIGHT
    this.width = width || CELL_WIDTH
  }

  toJSON () {
    const { height, width } = this
    const { x, y } = this.position

    return { x, y, width, height }
  }

  center () {
    const { x, y } = this.position
    const { height, width } = this

    return new Vector({
      x: x + Math.floor(width / 2),
      y: y + Math.floor(height / 2),
    })
  }
}

export default Cell
