import * as d3 from 'd3'
import { getDomOffset } from './utils'
import DrawActionEvent from '../event/DrawActionEvent.interface'
import Lifecycle from '../event/Lifecycle'
import MouseEvent from '../event/MouseEvent'
import { degree2Radian, vectorDegree } from '../constants/tools'
import { ArrowHeight, HalfArrowDegree, ArrowSlopEdge} from '../constants/box'

export default class Arrow extends MouseEvent implements DrawActionEvent, Lifecycle{
   private mouseDown = false;
   private startX = 0;
   private startY = 0;
   private placeholderX = 0;
   private placeholderY = 0;
   private endX = 0;
   private endY = 0;
   private target: any = null;
   public svgDom: Node | Element | HTMLElement;
   constructor (svgDom: any) {
     super(svgDom)
     this.svgDom = svgDom
   }

    created (svgDom: Node | Element) {
    }
   

  destroy () {
  }

  startHandler (e: any): void {
    e.preventDefault()
    // console.log(e, e.offsetX, e.offsetY)
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
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
                .attr('d', `M${this.startX} ${this.startY} L${this.placeholderX} ${this.placeholderY}`)
          // d3.select(group.node())
          //       .append('path')
          //       .attr('fill', 'black')
          //       .attr('stroke', 'black')
          //       .attr('fill-opacity', '1')
          //       .attr('stroke-opacity', '1')
          //       .attr('stroke-linecap', 'butt')
          //       .attr('d', this.drawArrowPath(this.startX, this.startY, this.placeholderX, this.placeholderY))
        } else {
            d3.select(this.target)
              .selectAll('path')
              .filter(function (d, i) { return i === 0;})
              .attr('d', `M${this.startX} ${this.startY} L${this.placeholderX} ${this.placeholderY}`)

            // d3.select(this.target)
            //   .selectAll('path')
            //   .filter(function (d, i) { return i === 1;})
            //   .attr('d', this.drawArrowPath(this.startX, this.startY, this.placeholderX, this.placeholderY))
        }
      }
    }
  }

  endHandler (e: any) {
    e.preventDefault()
    // console.log(e.type , e)
    if(this.mouseDown) {
      this.mouseDown = false
      this.endX = this.getOffsetX(e)
      this.endY = this.getOffsetY(e)
      if (this.startX !== this.endX || this.startY !== this.endY) {
      if (!this.target) {
        let group = d3.select(this.svgDom as Element).append('g')
        this.target = group.node()
        // line
        d3.select(group.node())
             .append('path')
             .attr('stroke', '#666')
             .attr('d', `M${this.startX} ${this.startY} L${this.endX} ${this.endY}`)
       d3.select(group.node())
             .append('path')
             .attr('stroke', 'black')
             .attr('fill-opacity', '1')
             .attr('stroke-opacity', '1')
             .attr('stroke-linecap', 'butt')
             .attr('fill', 'black')
             .attr('d', this.drawArrowPath(this.startX, this.startY, this.endX, this.endY))
     } else {
         d3.select(this.target)
           .selectAll('path')
           .filter(function (d, i) { return i === 0;})
           .attr('d', `M${this.startX} ${this.startY} L${this.endX} ${this.endY}`)

         d3.select(this.target)
            .append('path')
            .attr('stroke', 'black')
            .attr('fill-opacity', '1')
            .attr('stroke-opacity', '1')
            .attr('stroke-linecap', 'butt')
            .attr('fill', 'black')
            .attr('d', this.drawArrowPath(this.startX, this.startY, this.endX, this.endY))
     }
    }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
    }
  }

  drawArrowPath (x1: number, y1: number, x2: number, y2: number) {
    var alpha = vectorDegree(x1, y1, x2, y2)
    var beta1 = degree2Radian(alpha + HalfArrowDegree)
    var beta2 = degree2Radian(alpha - HalfArrowDegree)
    const path = `M${x2} ${y2} L${x2 + Math.cos(beta1) * ArrowSlopEdge} ${y2 + Math.sin(beta1) * ArrowSlopEdge} L${x2 + Math.cos(beta2) * ArrowSlopEdge} ${y2 + Math.sin(beta2) * ArrowSlopEdge}`
    console.log(x1, y1, x2, y2, alpha, beta1, beta2, path)
    return path 
  }

  getOffsetX(e: any) {
    if(e.touches) {
      if (e.touches[0]) {
        const offset: any =  getDomOffset(this.svgDom)
        return e.touches[0].pageX - offset.offsetLeft 
      } else { // touchend
        return this.placeholderX
      }
    } else {
      return e.offsetX || e.pageX
    }
  }

  getOffsetY(e: any) {
    if(e.touches) {
      if (e.touches[0]) {
        const offset: any =  getDomOffset(this.svgDom)
        return e.touches[0].pageY - offset.offsetTop
      } else { // touchend
        return this.placeholderY
      }
    } else {
      return e.offsetY || e.pageY
    }
  }
}