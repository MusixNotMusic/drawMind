export default class MouseEvent {
    public svgDom: any;
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
}