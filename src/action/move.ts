import MouseEvent from '../event/MouseEvent'
import { MoveProps } from '../constants/defaultsProps'
import { Plane } from '../entity/plane'
import { translatePoints } from '../constants/transform'
import { cloneDeep } from 'lodash'

export default class Move extends MouseEvent {
   private mouseDown = false;
   private startX = 0;
   private startY = 0;
   public placeholderX = 0;
   public placeholderY = 0;
   private endX = 0;
   private endY = 0;
   private target: any = null;
   public svgDom: any;
   private panel: any;
   private plane: any;
   private mem: any;
   
   constructor (panel: any, mem: any) {
    super(mem.target)
    this.panel = panel
    this.svgDom = panel.svgDom
    this.mem = mem;
  }


  startHandler (e: any): void {
    e.preventDefault()
    this.mouseDown = true
    this.startX = this.getOffsetX(e)
    this.startY = this.getOffsetY(e)
    this.plane = new Plane({ cmd: this.mem.cmd })
  }

  moveHandler (e: any) {
    e.preventDefault()
    if(this.mouseDown) {
      this.placeholderX = this.getOffsetX(e)
      this.placeholderY = this.getOffsetY(e)
      if (this.startX !== this.placeholderX || this.startY !== this.placeholderY) {
        let _points = []
        let dx = this.placeholderX - this.startX
        let dy = this.placeholderY - this.startY
        _points = cloneDeep(this.mem.points)
        translatePoints(_points, dx, dy)
        if (!this.target) {
          this.target = this.plane.createDom(_points, MoveProps)
        } else {
          this.target = this.plane.updateDom(_points, MoveProps)
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
      let dx = this.endX - this.startX
      let dy = this.endY - this.startY
      if (this.startX !== this.endX || this.startY !== this.endY) {
        this.target.remove()
        let points = cloneDeep(this.mem.points)
        translatePoints(points, dx, dy)
        this.mem.points = points
        this.plane.setOptions(this.mem)
        this.plane.updateDom(this.mem.points)
        this.panel.$eventemit.emit('selected-move-done', this.mem, this)
      }
      this.placeholderX = 0
      this.placeholderY = 0
      this.endX = 0
      this.endY = 0
      this.target = null
    }
  }
}