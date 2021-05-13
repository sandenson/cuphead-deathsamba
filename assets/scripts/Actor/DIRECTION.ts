export const DIRECTIONS = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
} as const

interface DIRECTION {
  x: number;
  y: number;
}

export default DIRECTION;