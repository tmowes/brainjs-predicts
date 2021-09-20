/* eslint-disable no-console */
import brain from 'brain.js'

const trainingData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
]

const net = new brain.recurrent.LSTMTimeStep()

net.train(trainingData, {})

// net.train(trainingData, { log: true, errorThresh: 0.09 })

const closeToFive = net.run([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])

const closeToOne = net.run([15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2])

console.log({ closeToFive, closeToOne })

// // now we're cookin' with gas!
// const forecast = net.forecast(
//   [
//     [1, 5],
//     [2, 4],
//   ],
//   3,
// ) as number[][]

// console.log('next 3 predictions', forecast)

// {
//   inputSize: 2,
//   hiddenLayers: [10],
//   outputSize: 2,
// }
