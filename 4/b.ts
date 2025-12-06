import fs from 'node:fs'
import path from 'node:path'

const grid = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n')
  .map((v) => v.split(''))

let prevSum = -Infinity
let sum = 0

while (prevSum !== sum) {
  prevSum = sum
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== '@') continue
      const adjacent = [
        grid[i - 1]?.[j - 1],
        grid[i - 1]?.[j],
        grid[i - 1]?.[j + 1],
        grid[i + 1]?.[j - 1],
        grid[i + 1]?.[j],
        grid[i + 1]?.[j + 1],
        grid[i]?.[j - 1],
        grid[i]?.[j + 1],
      ].reduce((acc, v) => acc + (v === '@' ? 1 : 0), 0)
      if (adjacent < 4) {
        sum++
        grid[i].splice(j, 1, '.')
      }
    }
  }
}

console.log(sum)
