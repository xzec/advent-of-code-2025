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
  const steps = parseInt(rotation.slice(1), 10)
  const normalized = steps % DIAL_SIZE
  const rotations = Math.floor(steps / DIAL_SIZE)

  if (direction === 'L') return [normalized * -1, rotations]
  else return [normalized, rotations]
}

for (const rotation of rotations) {
  const [normalized, rotations] = parseRotation(rotation)
  const prevDial = dial
  dial += normalized

  count += rotations
  if (dial === 0) count++

  if (dial < 0) {
    dial += DIAL_SIZE
    if (prevDial !== 0) count++
  }
  if (dial > 99) {
    dial -= DIAL_SIZE
    if (prevDial !== 0) count++
  }
}

console.log(count)
