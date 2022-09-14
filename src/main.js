import * as createjs from "createjs-module"
import { calcSin } from "./math"
import * as grid from "./grid"
import * as math from "./math"
import * as R from "ramda"
import * as ticker from "./ticker"

const { clientWidth, clientHeight } = document.body
const canvas = document.getElementById("canvas")
canvas.width = clientWidth
canvas.height = clientHeight

const [centerX, centerY] = [clientWidth / 2, clientHeight / 2]

const mmToCm = math.metricPrefixConversion("milli", "centi")
const cmToPxForMacbookAir = math.cmToPx(2560, 227)
const mmToPxForMacbookAir = R.pipe(mmToCm, cmToPxForMacbookAir)
const factor = mmToPxForMacbookAir(10)

const stage = new createjs.Stage(canvas)
const axisThickness = 2
const xAxis = grid.xAxis("grey", clientWidth, clientHeight, mmToPxForMacbookAir(10))
stage.addChild(xAxis)


const originalSineLength = factor * 10
const sine1Props = { amplitude: factor, period: factor, length: originalSineLength, phase: 0 }
const sine2Props = { amplitude: factor, period: factor, length: originalSineLength, phase: factor }

let sine1Shape
let sine2Shape
let sineSumShape




const sine1Func = math.perfectSine(sine1Props.amplitude, sine1Props.period, sine1Props.phase)
sine1Shape = grid.func("red", originalSineLength, sine1Func)
sine1Shape.y = centerY
stage.addChild(sine1Shape)


const drawWaves = () => {


  // if (sine1Shape != null)
  //   stage.removeChild(sine1Shape)

  if (sine2Shape != null)
    stage.removeChild(sine2Shape)

  if (sineSumShape != null)
    stage.removeChild(sineSumShape)


  const sine2Func = math.perfectSine(sine2Props.amplitude, sine2Props.period, sine2Props.phase)
  sine2Shape = grid.func("lightblue", sine2Props.length, sine2Func)
  sine2Shape.y = centerY
  stage.addChild(sine2Shape)

  const sineSumFunc = math.functionalOperation(R.add, sine1Func, sine2Func)
  sineSumShape = grid.func("green", originalSineLength, sineSumFunc)
  sineSumShape.y = centerY
  stage.addChild(sineSumShape)

}

// console.log(math.rangePercentage(-100, 100)(50))


let x = 0
let dotShape
ticker.run(60, stage, () => {

  x++
  const y = sine1Func(x)
  const yPercentage = math.rangePercentage(-sine1Props.amplitude / 2, sine1Props.amplitude / 2)(y)
  const extraLength = yPercentage * 0.5



  if (dotShape != null)
    stage.removeChild(dotShape)

  dotShape = grid.dot("yellow", x, y, 5)
  dotShape.y = centerY
  stage.addChild(dotShape)


  sine2Props.phase = factor + (factor * extraLength)
  sine2Props.period = factor + (factor * extraLength)
  //sine2Props.amplitude = factor + (factor * extraLength)
  sine2Props.length = originalSineLength + (originalSineLength * extraLength)


  drawWaves()
})

