const render = ({ element, model }) => {
  const context = element.getContext('2d')
  const { x, y, height, width } = model.toJSON()

  context.beginPath()
  context.strokeStyle = '#000'
  context.fillStyle = '#fff'
  context.lineWidth = 1

  context.fillRect(x, y, width, height)
  context.strokeRect(x, y, width, height)
}

export default render
