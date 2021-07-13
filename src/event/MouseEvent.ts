import { getDomOffset } from '../constants/utils'
export default class MouseEvent {
    public svgDom: any;
    public placeholderX: number;
    public placeholderY: number;
    constructor(target: any) {
        this.svgDom = target
    }
    registerEvent () {
        if (this.svgDom) {
          this.svgDom.addEventListener('mousedown', this.startHandler.bind(this), false)  
          this.svgDom.addEventListener('mousemove', this.moveHandler.bind(this), false)
          this.svgDom.addEventListener('mouseup', this.endHandler.bind(this), false)
    
          this.svgDom.addEventListener('touchstart', this.startHandler.bind(this), false)  
          this.svgDom.addEventListener('touchmove', this.moveHandler.bind(this), false)
          this.svgDom.addEventListener('touchend', this.endHandler.bind(this), false)
        }
    }

    destroyEvent () {
        if (this.svgDom) {
            this.svgDom.removeEventListener('mousedown', () => {}, false)  
            this.svgDom.removeEventListener('mousemove', () => {}, false)
            this.svgDom.removeEventListener('mouseup', () => {}, false)
        
            this.svgDom.removeEventListener('touchstart', () => {}, false)  
            this.svgDom.removeEventListener('touchmove', () => {}, false)
            this.svgDom.removeEventListener('touchend', () => {}, false)
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