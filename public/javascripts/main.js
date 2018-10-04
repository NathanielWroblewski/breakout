import Ball from './models/ball.js'
import Paddle from './models/paddle.js'
import Cells from './models/cells.js'
import { setBackground, renderScreen } from './views/screen.js'
import { LEFT_ARROW, RIGHT_ARROW, SEARCH_THRESHOLD, PADDLE_THRESHOLD } from './constants/index.js'

const { requestAnimationFrame } = window
const element = document.querySelector('.game')

const ball = new Ball({})
const cells = new Cells({})
const paddle = new Paddle({})

const step = () => {
  ball.move()
  paddle.move()

  const { x, y } = ball.position

  if (y < SEARCH_THRESHOLD) {
    const nearestCell = cells.nearest({ to: [x, y] })

    if (ball.intersects(nearestCell)) {
      ball.contact(nearestCell)
      cells.remove(nearestCell)

      if (cells.areDepleted()) {
        setBackground({ element })
        cells.regenerate()
      }
    }
  }

  if (y > PADDLE_THRESHOLD && ball.intersects(paddle)) {
    ball.contact(paddle)
  }

  renderScreen({ element, ball, paddle, cells, isOver: ball.isDead() })
  requestAnimationFrame(step)
}

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case LEFT_ARROW:  return paddle.left()
    case RIGHT_ARROW: return paddle.right()
  }
}, false)

setBackground({ element })
step()
