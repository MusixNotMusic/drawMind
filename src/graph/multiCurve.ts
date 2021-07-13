import * as d3 from 'd3'
import Lifecycle from '../event/Lifecycle'
import MouseEvent from '../event/MouseEvent'
import { vectorRadian, vectorMod } from '../constants/tools'

export default class MultiCurve extends MouseEvent implements Lifecycle{
   private mouseDown = false;
   private startX = 0;
   private startY = 0;
   public placeholderX = 0;
   public placeholderY = 0;
   private endX = 0;
   private endY = 0;
   private target: any = null;
   public svgDom: Node | Element | HTMLElement;
   private pathPoint:Array<any> = [];
   private drawing = false
   constructor (svgDom: any) {
    super(svgDom)
    this.svgDom = svgDom
   }

   created (svgDom: Node | Element) {
   }


  destroy () {
  }

  startHandler (e: any): void {
    console.log('startHandler ==>')
    e.preventDefault()
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
    if (!this.drawing) {
      this.pathPoint.push([this.startX, this.startY])
      this.drawing = true
    }
    this.mouseDown = true
  }

  moveHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      this.placeholderX = this.getOffsetX(e)
      this.placeholderY = this.getOffsetY(e)
      if (this.startX !== this.placeholderX || this.startY !== this.placeholderY) {
        if (!this.target) {
           let group = d3.select(this.svgDom as Element).append('g')
           this.target = group.node()
           // line
           d3.select(group.node())
                .append('path')
                .attr('stroke', '#666')
                .attr('fill', 'none')
                .attr('d', `${this.getMultiCurveSquarePath(this.placeholderX, this.placeholderY)}`)
        } else {
            d3.select(this.target)
              .select('path')
              .attr('d', `${this.getMultiCurveSquarePath(this.placeholderX, this.placeholderY)}`)
        }
      }
    }
  }

  endHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      this.endX = this.getOffsetX(e)
      this.endY = this.getOffsetY(e)
      
      if (!this.target) {
          let group = d3.select(this.svgDom as Element).append('g')
          this.target = group.node()
          d3.select(group.node())
              .append('path')
              .attr('stroke', '#666')
              .attr('fill', 'none')
              .attr('d', `${this.getMultiCurveSquarePath(this.endX, this.endY)}`)
      } else {
          d3.select(this.target)
            .select('path')
            .attr('d', `${this.getMultiCurveSquarePath(this.endX, this.endY)}`)
            .attr('stroke-width', '2')
      }

      if (this.nearByRadius(this.pathPoint[0][0], this.pathPoint[0][1], this.endX, this.endY)) {
        this.mouseDown = false
        this.endX = this.pathPoint[0][0]        
        this.endY = this.pathPoint[0][1]
        d3.select(this.target)
          .select('path')
          .attr('fill', '#CFE2F3')          
          .attr('stroke', '#000')
          .attr('d', `${this.getMultiCurveSquarePath(this.endX, this.endY)}`)
          .attr('stroke-width', '2')
        
        this.pathPoint = []
        this.drawing = false
        this.target = null
      } else {
        this.pathPoint.push([this.endX, this.endY])
      }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
    }
  }

  getMultiCurveSquarePath(x: number, y: number) {
    let path = 'M'
    let newPoints = this.pathPoint.slice()
    newPoints.push([x, y])
    path += newPoints[0].join(' ') + ' '
    if (newPoints.length > 2) {
      let tail = newPoints.length - 1
      let startPoint = newPoints[0]
      let tailPoint = newPoints[tail]
      //  首位相同
      let closed = this.nearByRadius(startPoint[0], startPoint[1], tailPoint[0], tailPoint[1])
      closed ? newPoints.pop() : newPoints
      path += this.calcCurvePath(newPoints, 0, newPoints.length - 1, closed)
    } else if(newPoints.length === 2){
      path += 'L' + newPoints[1].join(' ')
    }
    return path
  }


  calcCurvePath (arr: any, startIndex: number, endIndex: number, closed: boolean) {
    let curveArr = []
    let prev
    let next
    let last = arr.length - 1
    if (!closed) {
      let anchors = this.getPointAnchor(arr[startIndex], arr[startIndex + 1], arr[startIndex])
      curveArr.push(anchors[1])
      startIndex = startIndex + 1
      endIndex = endIndex - 1
    }
    for (let i = startIndex; i <= endIndex; i++) {
      prev = (i - 1 < 0) ? arr[last] : arr[i - 1]
      next = (i + 1 < arr.length) ? arr[i + 1] : arr[0]
      let anchors = this.getPointAnchor(prev, next, arr[i])
      curveArr.push(anchors[0])
      curveArr.push(arr[i])
      curveArr.push(anchors[1])
    }
    if (!closed) {
      let anchors = this.getPointAnchor(arr[last - 1], arr[last], arr[last])
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
  getPointAnchor(point1: Array<number>, point2: Array<number>, center: Array<number>) {
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


  nearByRadius (x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= 10
  }
  
}