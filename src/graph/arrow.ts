import MouseEvent from '../event/MouseEvent'
import { Plane } from '../entity/plane'
import { ghostArrowProps, arrowProps } from '../constants/defaultsProps'

export default class Arrow extends MouseEvent{
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
   constructor (svgDom: any) {
     super(svgDom)
     this.svgDom = svgDom
    //  this.plane = new Plane({ cmd: 'arrow' })
   }

  startHandler (e: any): void {
    e.preventDefault()
    // console.log(e, e.offsetX, e.offsetY)
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
    this.points = [[this.startX, this.startY]]
    this.plane = new Plane({ cmd: 'arrow' })
  }

  moveHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      let _points = []
      this.placeholderX = this.getOffsetX(e)
      this.placeholderY = this.getOffsetY(e)
      if (this.startX !== this.placeholderX || this.startY !== this.placeholderY) {
        _points = this.points.slice()
        _points.push([this.placeholderX, this.placeholderY])
        if (!this.target) {
           this.target = this.plane.createDom(_points, ghostArrowProps)
        } else {
          this.target = this.plane.updateDom(_points, ghostArrowProps)
        }
        this.svgDom.append(this.target)
      }
    }
  }

  endHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      this.mouseDown = false
      this.endX = this.getOffsetX(e)
      this.endY = this.getOffsetY(e)
      if (this.startX !== this.endX || this.startY !== this.endY) {
        this.points.push([this.endX, this.endY])
        this.svgDom.append(this.plane.updateDom(this.points, arrowProps))
      }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
      this.plane = null
    }
  }
}