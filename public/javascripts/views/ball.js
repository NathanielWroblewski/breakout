import { TAU } from '../constants/index.js'

const render = ({ element, model }) => {
  const context = element.getContext('2d')
  const { x, y, radius } = model.toJSON()

  context.beginPath()
  context.fillStyle = '#fff'
  context.arc(x, y, radius, 0, TAU)
  context.fill()
}

export default render
