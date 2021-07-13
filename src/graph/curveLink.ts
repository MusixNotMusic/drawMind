import * as d3 from 'd3'
import Lifecycle from '../event/Lifecycle'
import MouseEvent from '../event/MouseEvent'

export default class CurveLink extends MouseEvent implements Lifecycle{
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
           let group = d3.select(this.svgDom as Element).append('g')
           this.target = group.node()
           // line
           d3.select(group.node())
                .append('path')
                .attr('stroke', '#666')
                .attr('stroke-width', '1.5')
                .attr('fill', 'transparent')
                .attr('d', this.drawCurvePath(this.startX, this.startY, this.placeholderX, this.placeholderY))
        } else {
            d3.select(this.target)
              .select('path')
              .attr('d', this.drawCurvePath(this.startX, this.startY, this.placeholderX, this.placeholderY))
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
             .attr('d', this.drawCurvePath(this.startX, this.startY, this.placeholderX, this.placeholderY))
     } else {
         d3.select(this.target)
           .select('path')
           .attr('stroke', '#000')
           .attr('stroke-width', '2')
           .attr('d', this.drawCurvePath(this.startX, this.startY, this.placeholderX, this.placeholderY))
     }
    }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
    }
  }

  drawCurvePath (x1: number, y1: number, x2: number, y2: number) {
    let path = ''
    if (x1 === x2 || y1 === y2) {
        path = `M${x1} ${y1} L${x2} ${y2}`
    } else {
        let dx = Math.abs(x2 - x1)
        let dy = Math.abs(y2 - y1)
        let _5 = 5 ** 0.5
        if (dx - dy >= 0) {
            // let x_anchor_1 = (x2 + x1 * 3) / 4
            // let x_anchor_2 = (x2 * 3 + x1) / 4
            let x_anchor_1 = (_5 - 1) * (x2 + _5 * x1) / 4
            let x_anchor_2 = (_5 - 1) * (_5 * x2 + x1) / 4
            let half_x = (x2 + x1) / 2
            let half_y = (y2 + y1) / 2
            path = `M${x1} ${y1} Q${x_anchor_1} ${y1} ${half_x} ${half_y} Q${x_anchor_2} ${y2} ${x2} ${y2}`
        } else {
            let y_anchor_1 = (_5 - 1) * (y2 + _5 * y1) / 4
            let y_anchor_2 = (_5 - 1) * (_5 * y2 + y1) / 4
            let half_x = (x2 + x1) / 2
            let half_y = (y2 + y1) / 2
            path = `M${x1} ${y1} Q${x1} ${y_anchor_1} ${half_x} ${half_y} Q${x2} ${y_anchor_2} ${x2} ${y2}`
        }
    }
    return path 
  }

}