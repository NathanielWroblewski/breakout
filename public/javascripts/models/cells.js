import Vector from './vector.js'
import Cell from './cell.js'
import KDTree from './kd_tree.js'
import {
  CELL_HEIGHT, CELL_WIDTH, MAX_ROW, MIN_ROW, COLUMNS, CELL_PROBABILITY,
} from '../constants/index.js'

const locate = (element) => {
  const { x, y } = element.center()

  return [x, y]
}

class Cells {
  constructor ({ items }) {
    const nodes = items || Cells.generate()

    this.tree = KDTree.from({ nodes, locate })
  }

  nearest ({ to }) {
    return this.tree.nearest({ to }).element
  }

  remove (cell) {
    this.tree = this.tree.remove(cell)
  }

  areDepleted () {
    return !this.tree
  }

  regenerate () {
    const nodes = Cells.generate()

    this.tree = KDTree.from({ nodes, locate })
  }

  toJSON () {
    return this.tree.elements()
  }

  static generate () {
    const columns = [...Array(COLUMNS).keys()];
    const rows = Array.from(Array(MAX_ROW - MIN_ROW), (_, i) => i + MIN_ROW)
    const cells = []

    columns.forEach(column => {
      rows.forEach(row => {
        if (Math.random() < CELL_PROBABILITY) {
          const x = column * CELL_WIDTH
          const y = row * CELL_HEIGHT
          const position = new Vector({ x, y })
          const cell = new Cell({ position})

          cells.push(cell)
        }
      })
    })

    return cells
  }
}

export default Cells
