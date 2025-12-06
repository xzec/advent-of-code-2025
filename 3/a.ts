import fs from 'node:fs'
import path from 'node:path'

const input = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n')
  .filter(Boolean)

let sum = 0

for (const line of input) {
  const bank = line.split('').map((v) => parseInt(v, 10))
  const tens = Math.max(...bank.slice(0, -1))

  const rest = bank.slice(bank.indexOf(tens) + 1)
  const ones = Math.max(...rest)

  sum += tens * 10 + ones
}

console.log(sum)
