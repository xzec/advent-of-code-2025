import fs from 'node:fs'
import path from 'node:path'

const input = fs.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8').split('\n')

const ops = input.pop()!.trim().split(/\s+/)
const numbers = input.map((line) => line.trim().split(/\s+/).map(Number))

let sum = 0

for (let i = 0; i < ops.length; i++) {
  const nums = numbers.map((n) => n[i])
  const op = ops[i]
  sum += eval(nums.join(` ${op} `))
}

console.log(sum)
