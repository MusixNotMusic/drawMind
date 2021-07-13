import * as d3 from 'd3'
import Lifecycle from '../event/Lifecycle'
import MouseEvent from '../event/MouseEvent'
import { loopCurvePath, nearByRadius } from '../path/loopCurve'
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
                .attr('d', `${loopCurvePath(this.placeholderX, this.placeholderY, this.pathPoint)}`)
        } else {
            d3.select(this.target)
              .select('path')
              .attr('d', `${loopCurvePath(this.placeholderX, this.placeholderY, this.pathPoint)}`)
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
              .attr('d', `${loopCurvePath(this.endX, this.endY, this.pathPoint)}`)
      } else {
          d3.select(this.target)
            .select('path')
            .attr('d', `${loopCurvePath(this.endX, this.endY, this.pathPoint)}`)
            .attr('stroke-width', '2')
      }

      if (nearByRadius(this.pathPoint[0][0], this.pathPoint[0][1], this.endX, this.endY)) {
        this.mouseDown = false
        this.endX = this.pathPoint[0][0]        
        this.endY = this.pathPoint[0][1]
        d3.select(this.target)
          .select('path')
          .attr('fill', '#CFE2F3')          
          .attr('stroke', '#000')
          .attr('d', `${loopCurvePath(this.endX, this.endY, this.pathPoint)}`)
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
}