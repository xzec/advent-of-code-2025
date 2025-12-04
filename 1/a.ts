import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const rotations = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n').filter(Boolean)

const DIAL_SIZE = 100
let dial = 50
let count = 0

function parseRotation(rotation: string) {
  const direction = rotation[0]
  const steps = parseInt(rotation.slice(1), 10) % DIAL_SIZE // normalize big rotations

  if (direction === 'L') return steps * -1
  else return steps
}

for (const rotation of rotations) {
  const parsed = parseRotation(rotation)
  dial += parsed

  if (dial < 0) dial += DIAL_SIZE
  if (dial > 99) dial -= DIAL_SIZE

  if (dial === 0) count++
}

console.log(count)
