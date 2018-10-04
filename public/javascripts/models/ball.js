import Vector from './vector.js'
import {
  WIDTH, HEIGHT, MAX_ROW, CELL_HEIGHT, BALL_VELOCITY, BALL_RADIUS
} from '../constants/index.js'

const randomPosition = () => {
  const x = Math.floor(Math.random() * WIDTH)
  const y = (MAX_ROW + 1) * CELL_HEIGHT

  return new Vector({ x, y })
}

const randomVelocity = () => {
  const x = Math.round(Math.random()) ? BALL_VELOCITY : -BALL_VELOCITY

  return new Vector({ x, y: BALL_VELOCITY })
}

class Ball {
  constructor ({ position, velocity, radius }) {
    this.position = position || randomPosition()
    this.velocity = velocity || randomVelocity()
    this.radius = radius || BALL_RADIUS
  }

  move () {
    this.position = this.position.add(this.velocity)
    this.bound()
  }

  bound () {
    if (this.position.x - this.radius <= 0) {
      this.position = new Vector({ x: this.radius, y: this.position.y })
      this.velocity = new Vector({ x: -this.velocity.x, y: this.velocity.y })
    }

    if (this.position.x + this.radius >= WIDTH) {
      this.position = new Vector({ x: WIDTH - this.radius, y: this.position.y })
      this.velocity = new Vector({ x: -this.velocity.x, y: this.velocity.y })
    }

    if (this.position.y - this.radius <= 0) {
      this.position = new Vector({ x: this.position.x, y: this.radius })
      this.velocity = new Vector({ x: this.velocity.x, y: -this.velocity.y })
    }

    if (this.position.y + this.radius >= HEIGHT) {
      this.position = new Vector({ x: this.position.x, y: HEIGHT - this.radius })
      this.velocity = new Vector({ x: 0, y: 0 })
      // this.velocity = new Vector({ x: this.velocity.x, y: -this.velocity.y })
    }
  }

  // TODO: Improve reflection
  // reflect () {
    // const degToRad = π/180
    // function getNormal(a) {
    //   return {
    //     x: Math.sin(a),
    //     y: -Math.cos(a)
    //   }
    // }

    // function reflect(n, v) {
    //   var d = 2 * dot(v, n);
    //   v.x -= d * n.x;
    //   v.y -= d * n.y;
    //   return v
    // }
  // }

  // TODO: consider speeding up ball
  // this.ball.speed += 10 * (1 - (this.ball.speed / this.ball.maxspeed)); // decay curve
  contact (object) {
    const { x, y } = this.position
    const center = object.center()

    if (
      (this.velocity.x > 0 && center.x > x) ||
      (this.velocity.x < 0 && center.x < x)
    ) {
      this.velocity = new Vector({ x: -this.velocity.x, y: this.velocity.y })
    }

    if (
      (this.velocity.y > 0 && center.y > y) ||
      (this.velocity.y < 0 && center.y < y)
    ) {
      this.velocity = new Vector({ x: this.velocity.x, y: -this.velocity.y })
    }
  }

  isDead () {
    const { x, y } = this.velocity

    return x === 0 && y === 0
  }

  intersects (polygon) {
    const center = polygon.center()
    const halfwidth = polygon.width / 2
    const halfheight = polygon.height / 2
    const distance = this.position.subtract(center)
    const { x, y } = new Vector({
      x: Math.abs(distance.x),
      y: Math.abs(distance.y)
    })

    if (x > (halfwidth + this.radius)) return false
    if (y > (halfheight + this.radius)) return false
    if (x <= halfwidth) return true
    if (y <= halfheight) return true

    const halfs = new Vector({ x: halfwidth, y: halfheight })
    const corner = new Vector({ x, y }).subtract(halfs)
    const cornerDistSq = corner.dot(corner)

    return cornerDistSq <= (this.radius * this.radius)
  }

  toJSON () {
    const { radius } = this
    const { x, y } = this.position

    return { x, y, radius }
  }
}

export default Ball
