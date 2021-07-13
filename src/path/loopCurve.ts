import { vectorRadian, vectorMod } from '../constants/math'
export function loopCurvePath(x: number, y: number, pathPoint: any) {
    let path = 'M'
    let newPoints = pathPoint.slice()
    newPoints.push([x, y])
    path += newPoints[0].join(' ') + ' '
    if (newPoints.length > 2) {
      let tail = newPoints.length - 1
      let startPoint = newPoints[0]
      let tailPoint = newPoints[tail]
      //  首位相同
      let closed = nearByRadius(startPoint[0], startPoint[1], tailPoint[0], tailPoint[1])
      closed ? newPoints.pop() : newPoints
      path += calcCurvePath(newPoints, 0, newPoints.length - 1, closed)
    } else if(newPoints.length === 2){
      path += 'L' + newPoints[1].join(' ')
    }
    return path
  }


function calcCurvePath (arr: any, startIndex: number, endIndex: number, closed: boolean) {
    let curveArr = []
    let prev
    let next
    let last = arr.length - 1
    if (!closed) {
      let anchors = getPointAnchor(arr[startIndex], arr[startIndex + 1], arr[startIndex])
      curveArr.push(anchors[1])
      startIndex = startIndex + 1
      endIndex = endIndex - 1
    }
    for (let i = startIndex; i <= endIndex; i++) {
      prev = (i - 1 < 0) ? arr[last] : arr[i - 1]
      next = (i + 1 < arr.length) ? arr[i + 1] : arr[0]
      let anchors = getPointAnchor(prev, next, arr[i])
      curveArr.push(anchors[0])
      curveArr.push(arr[i])
      curveArr.push(anchors[1])
    }
    if (!closed) {
      let anchors = getPointAnchor(arr[last - 1], arr[last], arr[last])
      curveArr.push(anchors[0])
      curveArr.push(arr[last])
    } else {
      curveArr.push(curveArr.shift())
      curveArr.push(curveArr.shift())
    }
    let path = "C "
    curveArr.forEach(point => {
      path += point.join(' ') + ' '
    })

    return path + (closed ? 'Z' : '')
  }
  /***
   * 获取 锚点
   * 前锚点 后锚点
   */
function getPointAnchor(point1: Array<number>, point2: Array<number>, center: Array<number>) {
    let radian = vectorRadian(point1[0], point1[1], point2[0], point2[1])
    let mod = vectorMod(point1[0], point1[1], point2[0], point2[1])
    let r = mod / 6
    return [
        [
          r * (-Math.cos(radian)) + center[0], 
          r * (-Math.sin(radian)) + center[1]
        ],
        [
          r * Math.cos(radian) + center[0],
          r * Math.sin(radian) + center[1]
        ]
      ]
  }

export function nearByRadius (x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= 10
}