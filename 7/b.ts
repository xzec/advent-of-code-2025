/**
 * Thanks for the hint: https://redd.it/1pgb377
 */

import fs from 'node:fs'
import path from 'node:path'

const input: (number | string)[][] = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n')
  .map((v) => v.split(''))

input[0][input[0].indexOf('S')] = 1

for (let i = 1; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const prev = input[i - 1][j]
    const curr = input[i][j]

    if (typeof prev === 'number') {
      if (typeof curr === 'number') {
        input[i][j] = curr + prev
        continue
      }
      if (curr === '.') {
        input[i][j] = prev
        continue
      }
      if (curr === '^') {
        const left = input[i][j - 1]
        input[i][j - 1] = typeof left === 'number' ? left + prev : prev

        const right = input[i][j + 1]
        input[i][j + 1] = typeof right === 'number' ? right + prev : prev
      }
    }
  }
}

const sum = input.at(-1)!.reduce<number>((acc, curr) => (typeof curr === 'number' ? acc + curr : acc), 0)
console.log(sum)
