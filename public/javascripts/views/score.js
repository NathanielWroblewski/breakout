const template = ({ score }) => (
  `<span class="label">SCORE</span> <span class="points">${parseInt(score, 10)}</span>`
)

const render = ({ element, model }) => (
  element.innerHTML = template(model.toJSON())
)

export default render
