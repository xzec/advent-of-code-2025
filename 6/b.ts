import fs from 'node:fs'
import path from 'node:path'

const input = fs.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8').split('\n')

const ops = input.pop()!.trim().split(/\s+/)

let sum = 0
const batch = []

for (let i = 0; i <= input[0].length; i++) {
  const curr = []
  for (let j = 0; j < input.length; j++) {
    curr.push(input[j][i])
  }
  const num = curr.join('')
  if (!num.trim().length || i === input[0].length) {
    const op = ops.shift()
    sum += eval(batch.join(` ${op} `))
    batch.splice(0)
  } else batch.push(parseInt(num, 10))
}

console.log(sum)
