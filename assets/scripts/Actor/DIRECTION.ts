export const DIRECTIONS = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
} as const

interface DIRECTION {
  x: number;
  y: number;
}

export default DIRECTION;