export const TAU = 2 * Math.PI

export const WIDTH = 400
export const HEIGHT = 500

export const CELL_HEIGHT = 6
export const CELL_WIDTH = 20
export const CELL_PROBABILITY = 0.2

export const COLUMNS = WIDTH / CELL_WIDTH
export const MIN_ROW = 5
export const MAX_ROW = 30

export const PADDLE_HEIGHT = 7
export const PADDLE_WIDTH = 30

export const LEFT_ARROW = 37
export const RIGHT_ARROW = 39

export const MOVEMENT = 5

export const BALL_VELOCITY = 3
export const BALL_RADIUS = 3

export const SEARCH_THRESHOLD = CELL_HEIGHT * MAX_ROW + BALL_RADIUS + 2
export const PADDLE_THRESHOLD = HEIGHT - 20 - PADDLE_HEIGHT - BALL_RADIUS - 2
