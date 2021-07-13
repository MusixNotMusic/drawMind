export function loopLinePath(pathPoint: any) {
    let path = 'M'
    if (pathPoint.length > 0) {
      path += pathPoint[0].join(' ')
      pathPoint.slice(1).forEach((point: number[]) => {
        path += 'L' + point.join(' ')
      })
    }
    return path
}