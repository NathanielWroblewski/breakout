import Ball from './models/ball.js'
import Paddle from './models/paddle.js'
import Cells from './models/cells.js'
import Score from './models/score.js'
import { setBackground, renderScreen } from './views/screen.js'
import {
  LEFT_ARROW, RIGHT_ARROW, A, D, SEARCH_THRESHOLD, PADDLE_THRESHOLD, CHECKPOINTS
} from './constants/index.js'

const { requestAnimationFrame } = window
const element = document.querySelector('.game')

const ball = new Ball({})
const cells = new Cells({})
const paddle = new Paddle({})
const score = new Score({})

const step = () => {
  ball.move()
  paddle.move()

  const { x, y } = ball.position

  if (y < SEARCH_THRESHOLD) {
    const nearestCell = cells.nearest({ to: [x, y] })

    if (ball.intersects(nearestCell)) {
      ball.contact(nearestCell)
      cells.remove(nearestCell)
      score.increment()

      if (score.in(CHECKPOINTS)) {
        ball.boost()
      }

      if (cells.areDepleted()) {
        setBackground({ element })
        cells.regenerate()
        score.bonus()
      }
    }
  }

  if (y > PADDLE_THRESHOLD && ball.intersects(paddle)) {
    ball.contact(paddle)
  }

  renderScreen({ element, ball, paddle, cells, score, isOver: ball.isDead() })
  requestAnimationFrame(step)
}

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case LEFT_ARROW:
    case A:
      return paddle.left()
    case RIGHT_ARROW:
    case D:
      return paddle.right()
  }
}, false)

const touchHandler = event => {
  const { touches } = event
  const { offsetLeft } = element.querySelector('canvas')
  const { x, y } = paddle.center()

  if (touches && touches[0].pageX - offsetLeft < x) {
    event.preventDefault()

    return paddle.left()
  }

  if (touches && touches[0].pageX - offsetLeft > x) {
    event.preventDefault()

    return paddle.right()
  }
}

if ('ontouchstart' in window) {
  document.addEventListener('touchstart', touchHandler)
  document.addEventListener('touchmove', touchHandler)
  document.querySelector('.mobile.controls').style.display = 'block';
} else {
  document.querySelector('.desktop.controls').style.display = 'block';
}

setBackground({ element })
step()
