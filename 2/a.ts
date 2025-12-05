import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split(',')

let sum = 0
for (const range of input) {
  let [strMin, strMax] = range.split('-')
  if (strMin.length % 2 === 1 && strMin.length === strMax.length) {
    continue
  }
  let [min, max] = [strMin, strMax].map((v) => parseInt(v, 10))

  for (let i = min; i <= max; i++) {
    const str = String(i)
    if (str.slice(0, str.length / 2) === str.slice(str.length / 2, str.length)) sum += i
  }
}

console.log(sum)
