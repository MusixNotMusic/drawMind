import * as d3 from 'd3'
import { getDomOffset } from '../constants/utils'
import DrawActionEvent from '../event/DrawActionEvent.interface'
import MouseEvent from '../event/MouseEvent'
import Lifecycle from '../event/Lifecycle'

export default class MultiLine extends MouseEvent implements DrawActionEvent, Lifecycle{
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
   constructor (svgDom: any) {
    super(svgDom)
    this.svgDom = svgDom
   }

   created (svgDom: Node | Element) {
        this.svgDom = svgDom
   }

  destroy () {
  }

  startHandler (e: any): void {
    e.preventDefault()
    // console.log(e, e.offsetX, e.offsetY)
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
    this.pathPoint.push([this.startX, this.startY])
  }

  moveHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      // console.log(e.type, e)
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
                .attr('d', `${this.getMultiSquarePath()}  L${this.placeholderX} ${this.placeholderY}`)
        } else {
            d3.select(this.target)
              .select('path')
              .attr('d', `${this.getMultiSquarePath()}  L${this.placeholderX} ${this.placeholderY}`)
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
              .attr('d', `${this.getMultiSquarePath()}  L${this.endX} ${this.endY}`)
      } else {
          d3.select(this.target)
            .select('path')
            .attr('d', `${this.getMultiSquarePath()}  L${this.endX} ${this.endY}`)
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
          .attr('d', `${this.getMultiSquarePath()} L${this.endX} ${this.endY}`)
          .attr('stroke-width', '2')
        
        this.pathPoint = []
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

  getMultiSquarePath() {
    let path = 'M'
    if (this.pathPoint.length > 0) {
      path += this.pathPoint[0].join(' ')
      this.pathPoint.slice(1).forEach(point => {
        path += 'L' + point.join(' ')
      })
    }
    return path
  }

  nearByRadius (x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= 3
  }
}