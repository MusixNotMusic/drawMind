import * as d3 from 'd3'
import { getDomOffset } from '../constants/utils'
import DrawActionEvent from '../event/DrawActionEvent.interface'
import Lifecycle from '../event/Lifecycle'
import MouseEvent from '../event/MouseEvent'
export default class Line extends MouseEvent implements DrawActionEvent, Lifecycle{
   private mouseDown = false;
   private startX = 0;
   private startY = 0;
   public placeholderX = 0;
   public placeholderY = 0;
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
           let _target =  d3.select(this.svgDom as Element)
                .append('path')
                .attr('stroke', '#666')
                .attr('d', `M${this.startX} ${this.startY} L${this.placeholderX} ${this.placeholderY}`)
            this.target = _target.node()
        } else {
            d3.select(this.target).attr('d', `M${this.startX} ${this.startY} L${this.placeholderX} ${this.placeholderY}`)
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
      if (!this.target) {
        // this.target = (this.svgDom as Node).appendChild(`<path stroke=#666  d="M${this.startX} ${this.startY} L${this.endX} ${this.endY}">`)
        let _target = d3.select(this.svgDom as Element)
                .append('path')
                .attr('stroke', '#666')
                .attr('d', `M${this.startX} ${this.startY} L${this.endX} ${this.endY}`)
        this.target = _target.node()
      } else {
        d3.select(this.target)
          .attr('d', `M${this.startX} ${this.startY} L${this.endX} ${this.endY}`)
          .attr('stroke-width', '1.5')
      }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
    }
  }
}