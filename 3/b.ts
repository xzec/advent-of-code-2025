import fs from 'node:fs'
import path from 'node:path'

const input = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n')
  .filter(Boolean)

const BATTERY_COUNT = 12
let sum = 0

function findMaxAndIndex(sequence: number[], start: number, end: number): [max: number, index: number] {
  let max = -Infinity
  let index = -1
  for (let i = start; i < end; i++) {
    if (sequence[i] > max) {
      max = sequence[i]
      index = i
    }
  }
  return [max, index]
}

for (const line of input) {
  const batteryBank = line.split('').map((v) => parseInt(v, 10))

  const batteries = []
  let start = 0

  for (let i = 0; i < BATTERY_COUNT; i++) {
    const end = batteryBank.length - (BATTERY_COUNT - i - 1)
    const [max, indexOfMax] = findMaxAndIndex(batteryBank, start, end)
    batteries.push(max)
    start = indexOfMax + 1
  }

  sum += parseInt(batteries.join(''), 10)
}

console.log(sum)
