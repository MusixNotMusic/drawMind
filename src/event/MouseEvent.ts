import { getDomOffset } from '../dom/utils'
import * as d3 from 'd3'

export default class MouseEvent {
    public svgDom: any;
    public placeholderX: number;
    public placeholderY: number;
    public eventEmit: any;
    constructor(target: any) {
        this.svgDom = target
    }
    registerEvent () {
        if (this.svgDom) {
          d3.select(this.svgDom).on('mousedown', this.startHandler.bind(this))
          d3.select(this.svgDom).on('mousemove', this.moveHandler.bind(this))
          d3.select(this.svgDom).on('mouseup', this.endHandler.bind(this))

          d3.select(this.svgDom).on('touchstart', this.startHandler.bind(this))
          d3.select(this.svgDom).on('touchmove', this.moveHandler.bind(this))
          d3.select(this.svgDom).on('touchend', this.endHandler.bind(this))
        }
    }

    destroyEvent () {
        if (this.svgDom) {
            d3.select(this.svgDom).on('mousedown', null)
            d3.select(this.svgDom).on('mousemove', null)
            d3.select(this.svgDom).on('mouseup', null)

            d3.select(this.svgDom).on('touchstart', null)
            d3.select(this.svgDom).on('touchmove', null)
            d3.select(this.svgDom).on('touchend', null)
            this.svgDom = null
        }
    }

    startHandler (e: any) {}
    moveHandler (e: any) {}
    endHandler (e: any) {}

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