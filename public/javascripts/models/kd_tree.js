import { medianIndex } from '../utilities/splitting.js'
import { squaredDistance } from '../utilities/distance.js'
import { flatten } from '../utilities/index.js'

class Node {
  constructor ({ element, locate, left, right, parent }) {
    this.parent = parent
    this.element = element
    this.locate = locate
    this.left = left
    this.right = right
  }

  nearest ({ to, distance = squaredDistance, depth = 0 }) {
    const branches = this._orderCandidateBranches({ to, depth })

    return branches.reduce((memo, branch) => {
      const best = memo.locate(memo.element)
      const candidate = branch.nearest({ to, distance, depth: depth + 1 })
      const nextBest = candidate.locate(candidate.element)

      return distance(to, best) > distance(to, nextBest) ? candidate : memo
    }, this)
  }

  _orderCandidateBranches ({ to, depth }) {
    const { left, right, element, locate } = this
    const location = locate(element)
    const k = location.length
    const axis = depth % k
    const branches = to[axis] < location[axis] ? [left, right] : [right, left]

    return branches.filter(branch => branch)
  }

  // TODO: Clean this up
  remove (target, options = {}) {
    const { depth = 0, split = medianIndex } = options
    const { locate, parent, element, left, right } = this

    if (target === element) {
      const nodes = [...this.elementsOf(left), ...this.elementsOf(right)]
      const newTree = Node.from({ nodes, locate, depth, split, parent })

      if (parent) {
        parent.left === this ? parent.left = newTree : parent.right = newTree
      }

      this.parent = null
      this.left = null
      this.right = null

      if (newTree) {
        return newTree.getRoot()
      } else if (parent) {
        return parent.getRoot()
      } else {
        return null
      }
    } else {
      //TODO: descend tree more intelligently
      return (
        (this.left && this.left.remove(target, { depth: depth + 1, split })) ||
        (this.right && this.right.remove(target, { depth: depth + 1, split }))
      )
    }
  }

  getRoot () {
    return !this.parent ? this : this.parent.getRoot()
  }

  elementsOf (branch) {
    return branch ? branch.elements() : []
  }

  elements () {
    const { left, right } = this

    return flatten([this.element, this.elementsOf(left), this.elementsOf(right)])
  }

  static from ({ nodes = [], locate, depth = 0, split = medianIndex, parent = null }) {
    if (!nodes || !nodes.length) return null

    const k = locate(nodes[0]).length // dimensionality
    const axis = depth % k
    const medianIndex = split(nodes, node => locate(node)[axis])
    const node = new Node({ element: nodes[medianIndex], parent, locate })
    const leftBranch = nodes.slice(0, medianIndex)
    const rightBranch = nodes.slice(medianIndex + 1)

    node.left = Node.from({ nodes: leftBranch, depth: depth + 1, split, locate, parent: node })
    node.right = Node.from({ nodes: rightBranch, depth: depth + 1, split, locate, parent: node })

    return node
  }
}

export default Node
