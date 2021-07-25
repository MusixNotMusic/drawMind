export function translate(point: any[], dx: number, dy: number) {
  point[0] = point[0] + dx;
  point[1] = point[1] + dy;
  return point
}


export function translatePoints(points: any[], dx: number, dy: number) {
  points.forEach((point: any[]) => {
    translate(point, dx, dy)
  })
  return points
}
