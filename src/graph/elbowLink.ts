import * as d3 from 'd3'
import { getDomOffset } from './utils'
import DrawActionEvent from '../event/DrawActionEvent.interface'
import Lifecycle from '../event/Lifecycle'
import MouseEvent from '../event/MouseEvent'

export default class ElbowLink extends MouseEvent implements DrawActionEvent, Lifecycle{
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
                .attr('stroke-width', '1.5')
                .attr('fill', 'transparent')
                .attr('d', this.drawElbowPath(this.startX, this.startY, this.placeholderX, this.placeholderY))
        } else {
            d3.select(this.target)
              .select('path')
              .attr('d', this.drawElbowPath(this.startX, this.startY, this.placeholderX, this.placeholderY))
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
             .attr('stroke-width', '1.5')
             .attr('fill', 'transparent')
             .attr('d', this.drawElbowPath(this.startX, this.startY, this.placeholderX, this.placeholderY))
     } else {
         d3.select(this.target)
           .select('path')
           .attr('stroke', '#000')
           .attr('stroke-width', '2')
           .attr('d', this.drawElbowPath(this.startX, this.startY, this.placeholderX, this.placeholderY))
     }
    }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
    }
  }

  drawElbowPath (x1: number, y1: number, x2: number, y2: number) {
    let path = ''
    if (x1 === x2 || y1 === y2) {
        path = `M${x1} ${y1} L${x2} ${y2}`
    } else {
        let dx = Math.abs(x2 - x1)
        let dy = Math.abs(y2 - y1)
        if (dx - dy >= 0) {
            let half_x = (x2 + x1) / 2
            path = `M${x1} ${y1} H${half_x} V${y2} H${x2}`
        } else {
            let half_y = (y2 + y1) / 2
            path = `M${x1} ${y1} V${half_y} H${x2} V${y2}`
        }
    }
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