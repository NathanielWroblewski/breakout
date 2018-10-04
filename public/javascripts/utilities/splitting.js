import { sort } from './index.js'

export const medianIndex = (list, comparator) => (
  Math.floor(sort(list, comparator).length / 2)
)
