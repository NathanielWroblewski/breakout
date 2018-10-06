import { WIDTH, HEIGHT } from '../constants/index.js'
import { IMAGES } from '../constants/images.js'
import renderBall from './ball.js'
import renderCell from './cell.js'
import renderScore from './score.js'

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

export const renderScreen = ({ element, ball, paddle, cells, score, isOver }) => {
  const screen = element.querySelector('.screen')
  const points = element.querySelector('.score')

  if (isOver) {
    element.querySelector('.overlay').style.display = 'block'
  }

  clear({ element: screen })
  renderBall({ element: screen, model: ball })
  renderCell({ element: screen, model: paddle })
  renderScore({ element: points, model: score })
  cells.toJSON().forEach(model => renderCell({ element: screen, model }))
}
