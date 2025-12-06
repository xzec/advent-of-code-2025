import fs from 'node:fs'
import path from 'node:path'

const [strRanges, strIds] = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n\n')
  .map((v) => v.split('\n'))

type Range = [start: number, end: number]

const ranges = strRanges.map((range) => range.split('-').map((v) => parseInt(v, 10))) as Range[]
const ids = strIds.map((v) => parseInt(v, 10))

let count = 0

outer: for (const id of ids) {
  for (const [start, end] of ranges) {
    if (id >= start && id <= end) {
      count++
      continue outer
    }
  }
}

console.log(count)
