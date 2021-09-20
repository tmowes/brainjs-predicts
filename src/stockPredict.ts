import brain from 'brain.js'

import { rawData } from './rawData'

type Step = {
  open: number
  high: number
  low: number
  close: number
}

// const openValues = rawData.map(step => step.open)
// const highValues = rawData.map(step => step.high)
// const lowValues = rawData.map(step => step.low)
// const closeValues = rawData.map(step => step.close)

// const highestOpen = Math.max(...openValues)
// const lowestOpen = Math.min(...openValues)
// open: (step.open - lowestOpen) / (highestOpen - lowestOpen),
// console.log(lowestOpen)

// normalize (n - lowest) / (highest - lowest)
const scaleDown = (step: Step) => ({
  open: step.open / 138,
  high: step.high / 138,
  low: step.low / 138,
  close: step.close / 138,
})

// denormalize
const scaleUp = (step: Step) => ({
  open: step.open * 138,
  high: step.high * 138,
  low: step.low * 138,
  close: step.close * 138,
})

const scaledData = rawData.map(scaleDown)

// const slices = []

// for (let i = 0; i < rawData.length; i += 5) {
// slices.push(scaledData.slice(i, i + 5))
// }

const trainingData = [
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15, 20),
]

// console.log(JSON.stringify(trainingData, null, 2))

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 4,
})

net.train(trainingData, {
  learningRate: 0.005,
  errorThresh: 0.02,
  // log: s => console.log(s),
})

// console.log(scaleUp(net.run(trainingData[0]) as Step))

const nextForecast = net.forecast([trainingData[0][0], trainingData[0][1]], 3) as Step[]

console.log(nextForecast.map(scaleUp))

// normalize (n-lowest)/(highest-lowest)
