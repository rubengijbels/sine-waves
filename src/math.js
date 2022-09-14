import * as R from "ramda"

//export const perfectSine = (amplitude = 0, period = 0, phase = 0) => x => (amplitude / Math.PI) * Math.sin((x + phase) / (period / Math.PI))
export const perfectSine = (amplitude = 0, period = 0, phase = 0) => x => (amplitude / 2) * Math.sin((x + phase) / (period / Math.PI))
export const quadraticSine = (amplitude = 0, period = 0, phase = 0) => x => (amplitude / 2) * Math.sin((x + phase) / (period / Math.PI))
export const functionalOperation = (operator, f1, f2) => x => operator(f1(x), f2(x))
export const rangePercentage = (bottomValue, topValue) => partialValue => (partialValue - bottomValue) / (topValue - bottomValue)
export const invertNbr = x => x - x - x

export const cmToPx = (physicalScreenWidth, physicalPPI) => cm => {
  const virtualScreenWidth = window.screen.availWidth
  const screenPixelRatio = virtualScreenWidth / physicalScreenWidth
  const virtualPPI = physicalPPI * screenPixelRatio
  const inchToCm = inch => inch / 2.54
  const pixelsPerCm = inchToCm(virtualPPI)
  return cm * pixelsPerCm
}

// bottom -> top // top - bottom = 100
// 100 -> 200 //
// 150



const metricMap = {
  yotta: { power: 24, symbol: "Y", factorName: "septillion" },
  zetta: { power: 21, symbol: "Z", factorName: "sextillion" },
  exa: { power: 18, symbol: "E", factorName: "quintillion" },
  peta: { power: 15, symbol: "P", factorName: "quadrillion" },
  tera: { power: 12, symbol: "T", factorName: "trillion" },
  giga: { power: 9, symbol: "G", factorName: "billion" },
  mega: { power: 6, symbol: "M", factorName: "million" },
  kilo: { power: 3, symbol: "k", factorName: "thousand" },
  hecto: { power: 2, symbol: "h", factorName: "hundred" },
  deka: { power: 1, symbol: "da", factorName: "ten" },
  base: { power: 0, symbol: "", factorName: "" },
  deci: { power: -1, symbol: "d", factorName: "tenth" },
  centi: { power: -2, symbol: "c", factorName: "hundredth" },
  milli: { power: -3, symbol: "m", factorName: "thousandth" },
  micro: { power: -6, symbol: "μ", factorName: "millionth" },
  nano: { power: -9, symbol: "n", factorName: "billionth" },
  pico: { power: -12, symbol: "p", factorName: "trillionth" },
  femto: { power: -15, symbol: "f", factorName: "quadrillionth" },
  atto: { power: -18, symbol: "a", factorName: "quintillionth" },
  zepto: { power: -21, symbol: "z", factorName: "sextillionth" },
  yocto: { power: -14, symbol: "y", factorName: "septillionth" }
}


export const metricPrefixConversionFactor = (from, to) => 10 ** (metricMap[from].power - metricMap[to].power)
export const metricPrefixConversion = (from, to) => x => metricPrefixConversionFactor(from, to) * x
export const nthRoot = (n, root) => Math.pow(n, 1 / root)







// export const getFactorName = factor => {
//   const keyWithFactor = Object.keys(metricMap)
//     .find(key => 10 ** metricMap[key].power == factor)

//   if (keyWithFactor != null)
//     return metricMap[keyWithFactor].factorName

//   const sortedMetricArr = R.sortBy(x => x.power, Object.values(metricMap))
//   const lowestMetricElement = sortedMetricArr[0]
//   const highestMetricElement = R.last(sortedMetricArr)

//   for (let i = lowestMetricElement.power; i < 1; i++) {
//     const el = sortedMetricArr.find(x => x.power == i)
//     if (el != null) {
//       const elFactor = 10 ** el.power
//       if (elFactor < factor) {
//         return `${factor - elFactor} ${el.factorName}`
//       }
//     }
//   }
// }


