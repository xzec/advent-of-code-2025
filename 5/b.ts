import fs from 'node:fs'
import path from 'node:path'

const [strRanges] = fs
  .readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')
  .split('\n\n')
  .map((v) => v.split('\n'))

type Range = [start: number, end: number]

const ranges = strRanges.map((range) => range.split('-').map((v) => parseInt(v, 10))) as Range[]

function isOverlapping([a, b]: Range, [c, d]: Range) {
  return !((a < c && b < c) || (a > d && b > d))
}

function mergeRanges(...ranges: Range[]) {
  return ranges.reduce((acc, [start, end]) => [Math.min(acc[0], start), Math.max(acc[1], end)], [
    Infinity,
    -Infinity,
  ] as Range)
}

const disjointRanges: Range[] = []

for (const range of ranges) {
  const mergeWith: Range[] = []

  for (const dRange of disjointRanges) {
    if (isOverlapping(range, dRange)) mergeWith.push(dRange)
  }

  if (mergeWith.length) {
    for (const toMerge of mergeWith) {
      disjointRanges.splice(disjointRanges.indexOf(toMerge), 1)
    }
    const mergedRange = mergeRanges(range, ...mergeWith)
    disjointRanges.push(mergedRange)
  } else disjointRanges.push(range)
}

const sum = disjointRanges.reduce((acc, [start, end]) => acc + (end - start + 1), 0)

console.log(sum)
