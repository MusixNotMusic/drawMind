import * as d3 from 'd3'
import MouseEvent from '../event/MouseEvent'
import { Plane } from '../entity/plane'
import { ghostCurveProps, curveProps } from '../constants/defaultsProps'

export default class CurveLink extends MouseEvent {
   private mouseDown = false;
   private startX = 0;
   private startY = 0;
   public placeholderX = 0;
   public placeholderY = 0;
   private endX = 0;
   private endY = 0;
   private target: any = null;
   public svgDom: any;
   private plane: any = null;
   private points: any = [];
   private panel: any;
  constructor (panel: any) {
    super(panel.svgDom)
    this.panel = panel
    this.svgDom = panel.svgDom
  }

  startHandler (e: any): void {
    e.preventDefault()
    // console.log(e, e.offsetX, e.offsetY)
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
    this.points = [[this.startX, this.startY]]
    this.plane = new Plane({ cmd: 'curve' })
  }

  moveHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      // console.log(e.type, e)
      this.placeholderX = this.getOffsetX(e)
      this.placeholderY = this.getOffsetY(e)
      if (this.startX !== this.placeholderX || this.startY !== this.placeholderY) {
        let _points = this.points.slice()
        _points.push([this.placeholderX, this.placeholderY])
        if (!this.target) {
          this.target = this.plane.createDom(_points, ghostCurveProps)
        } else {
          this.target = this.plane.updateDom(_points, ghostCurveProps)
        }
        this.svgDom.append(this.target)
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
        this.points.push([this.endX, this.endY])
        this.target = this.plane.updateDom(this.points, curveProps)
        this.panel.$eventemit.emit('draw-finish', {target: this.target, points: this.points, cmd: 'line'}, this)
      }
      this.svgDom.append(this.target)
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
      this.plane = null
    }
  }
}