import MouseEvent from '../event/MouseEvent'
import { nearByRadius } from '../path/loopCurve'
import { ghostLoopLineProps, loopLineProps } from '../constants/defaultsProps'
import { Plane } from '../entity/plane'

export default class MultiLine extends MouseEvent{
   private mouseDown = false;
   private startX = 0;
   private startY = 0;
   public placeholderX = 0;
   public placeholderY = 0;
   private endX = 0;
   private endY = 0;
   private target: any = null;
   private drawing = false
   public svgDom: any;
   private plane: any = null;
   private points: any = [];
   constructor (svgDom: any) {
    super(svgDom)
    this.svgDom = svgDom
   }


  startHandler (e: any): void {
    e.preventDefault()
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
    if (!this.drawing) {
      this.points.push([this.startX, this.startY])
      this.drawing = true
      this.plane = new Plane({ cmd: 'loopLine' })
    }
  }

  moveHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      this.placeholderX = this.getOffsetX(e)
      this.placeholderY = this.getOffsetY(e)
      if (this.startX !== this.placeholderX || this.startY !== this.placeholderY) {
        let _points = this.points.slice()
        _points.push([this.placeholderX, this.placeholderY])
        if (!this.target) {
          this.target = this.plane.createDom(_points, ghostLoopLineProps)
        } else {
          this.target = this.plane.updateDom(_points, ghostLoopLineProps)
        }
        this.svgDom.append(this.target)
      }
    }
  }

  endHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      this.endX = this.getOffsetX(e)
      this.endY = this.getOffsetY(e)
      this.points.push([this.endX, this.endY])

      if (nearByRadius(this.points[0][0], this.points[0][1], this.endX, this.endY)) {
        this.mouseDown = false
        this.drawing = false
        this.plane.updateDom(this.points, loopLineProps)
        this.target = null
        this.plane = null
        this.points = []
      } else {
        this.target = this.plane.updateDom(this.points, ghostLoopLineProps)
      }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
    }
  }
}