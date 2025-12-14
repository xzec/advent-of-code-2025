import fs from 'node:fs'
import path from 'node:path'

const input = fs.readFileSync(path.join(import.meta.dirname, 'input.txt'), 'utf8')

type Point = [x: number, y: number, z: number]

const junctions = input.split('\n').map((v) => v.split(',').map(Number)) as Point[]

function distanceSquared(a: Point, b: Point) {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  const dz = a[2] - b[2]
  return dx * dx + dy * dy + dz * dz
}

const CONNECTIONS = 1_000
const usedPairs = new Set<string>()
const circuits: Point[][] = []

for (let i = 0; i < CONNECTIONS; i++) {
  let shortest = Infinity
  let left: Point | null = null
  let right: Point | null = null
  let key = ''

  for (let j = 0; j < junctions.length - 1; j++) {
    const currLeft = junctions[j]
    for (let k = j + 1; k < junctions.length; k++) {
      const currRight = junctions[k]

      const dist2 = distanceSquared(currLeft, currRight)

      if (dist2 < shortest) {
        const currKey = `${currLeft}|${currRight}`
        if (usedPairs.has(currKey)) continue

        shortest = dist2
        left = currLeft
        right = currRight
        key = currKey
      }
    }
  }

  if (!left || !right || !key) process.exit(1)

  usedPairs.add(key)

  // 1) both junctions are connected in one circuit = skip
  if (circuits.some((circuit) => circuit.includes(left) && circuit.includes(right))) continue

  let circuitWithLeft: Point[] | null = null
  let circuitWithRight: Point[] | null = null
  for (const circuit of circuits) {
    if (circuit.includes(left)) circuitWithLeft = circuit
    if (circuit.includes(right)) circuitWithRight = circuit
  }

  // 2) both junctions are connected in separate circuits = merge circuits
  if (circuitWithLeft && circuitWithRight) {
    circuits.splice(circuits.indexOf(circuitWithLeft), 1)
    circuitWithRight.push(...circuitWithLeft)
  }
  // 3) only the left junction is connected, add right
  else if (circuitWithLeft) {
    circuitWithLeft.push(right)
  }
  // 4) only the right junction is connected, add left
  else if (circuitWithRight) {
    circuitWithRight.push(left)
  }
  // 5) no junction is connected = create a new circuit
  else circuits.push([left, right])
}

const sum = circuits
  .sort((a, b) => b.length - a.length)
  .slice(0, 3)
  .reduce((acc, v) => acc * v.length, 1)

console.log(sum)
