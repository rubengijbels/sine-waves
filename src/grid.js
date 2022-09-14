import * as createjs from "createjs-module"
import * as R from "ramda"
import { invertNbr, perfectSine } from "./math"

const defaultSinProperties = {
  amplitude: 0,
  period: 0,
  phase: 0,
}



export const func = (
  color,
  length,
  func
) => {

  const getY = R.pipe(func, invertNbr)
  const shape = new createjs.Shape()
  shape.graphics.beginStroke(color)

  for (let x = 0; x <= length; x += 2) {
    const y = getY(x)
    shape.graphics.append(new createjs.Graphics.LineTo(x, y))
  }

  return shape
}

export const xAxis = (
  color,
  clientWidth,
  clientHeight,
  interval
) => {
  const shape = new createjs.Shape()
  const thickness = 2
  const centerY = clientHeight / 2
  const y = centerY - (thickness / 2)
  shape.graphics.beginFill(color).drawRect(0, y, clientWidth, thickness)

  const intervals = clientWidth / interval
  for (let i = 0; i <= intervals; i++) {
    const markerWidth = 2
    const markerHeight = 5
    const markerX = i * interval - (markerWidth / 2)
    const markerY = centerY - 5
    shape.graphics.drawRect(markerX, markerY, markerWidth, 5)
  }

  return shape
}

export const dot = (color, x, y, radius) => {
  const shape = new createjs.Shape()
  shape.graphics.beginFill(color).drawRect(x - radius / 2, invertNbr(y) - radius / 2, radius, radius)
  return shape
}