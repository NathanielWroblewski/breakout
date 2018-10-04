import { WIDTH, HEIGHT } from '../constants/index.js'
import { IMAGES } from '../constants/images.js'
import renderBall from './ball.js'
import renderCell from './cell.js'

export const clear = ({ element }) => {
  const context = element.getContext('2d')

  context.clearRect(0, 0, WIDTH, HEIGHT)
}

export const setBackground = ({ element }) => {
  const randomIndex = Math.floor(Math.random() * IMAGES.length)
  const image = IMAGES[randomIndex]

  element.style.background = `#000 url("${image}") no-repeat center center`;
  element.style.backgroundSize = `auto 540px`;
}

export const renderScreen = ({ element, ball, paddle, cells, isOver }) => {
  const screen = element.querySelector('.screen')

  if (isOver) {
    element.querySelector('.overlay').style.display = 'block'
  }

  clear({ element: screen })
  renderBall({ element: screen, model: ball })
  renderCell({ element: screen, model: paddle })
  cells.toJSON().forEach(model => renderCell({ element: screen, model }))
}
