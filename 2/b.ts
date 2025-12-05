import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split(',')

let sum = 0

function isInvalidId(str: string) {
  if (str.length === 1) return false
  for (let i = 0; i < str.length / 2; i++) {
    const separator = str.slice(0, i + 1)
    if (str.split(separator).every((v) => v === '')) return true
  }
  return false
}

for (const range of input) {
  let [min, max] = range.split('-').map((v) => parseInt(v, 10))

  for (let i = min; i <= max; i++) {
    if (isInvalidId(String(i))) sum += i
  }
}

console.log(sum)
