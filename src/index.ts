import brain from 'brain.js'

const trainingData = [
  { input: { blue: 1 }, output: [1] },
  { input: { red: 1 }, output: [1] },
  { input: { black: 1 }, output: [0] },
  { input: { green: 1 }, output: [0] },
  { input: { yellow: 1 }, output: [0] },
]

const net = new brain.NeuralNetwork()

net.train(trainingData, {
  // log: s => console.log(s),
})

console.log('before preference change')
console.log(Array.from(net.run({ blue: 1 })))
console.log(Array.from(net.run({ yellow: 1 })))

const newPreference = { input: { yellow: 1 }, output: [1] }
// const prevPref = trainingData.filter(data => data.input !== newPreference.input)
trainingData.pop()
trainingData.push(newPreference)

net.train(trainingData, {})

console.log('after preference change')
console.log(Array.from(net.run({ blue: 1 })))
console.log(Array.from(net.run({ yellow: 1 })))
