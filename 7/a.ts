import fs from 'node:fs'
import path from 'node:path'

const input = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n')
  .map((v) => v.split(''))

let splits = 0

for (let i = 1; i < input.length; i++) {
  const prevRow = input[i - 1]
  const currRow = input[i]
  input[i] = currRow.reduce((acc, curr, j) => {
    const prev = prevRow[j]
    if (prev === 'S' || prev === '|') {
      if (curr === '.') acc[j] = '|'
      if (curr === '^') {
        acc[j - 1] = '|'
        acc[j + 1] = '|'
        splits++
      }
    }
    return acc
  }, currRow.slice())
}

console.log(splits)
