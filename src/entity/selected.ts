import { parserSvgString } from '../dom/utils'
export default class SelectedRect {
    private topLeft: number[];
    private topCenter: number[];
    private topRight: number[];
    private midLeft: number[];
    private center: number[];
    private midRight: number[];
    private bottomLeft: number[];
    private bottomCenter: number[];
    private bottomRight: number[];
    private rotateDegree: number = 0;
    private target: any = null;
    private d: string
    // private positions = [
    //     [0, 0], [0, 1], [0, 2],
    //     [1, 0], [1, 1], [1, 2],
    //     [2, 0], [2, 1], [2, 2],
    // ]
    constructor(options: any) {
        this.target = options.target
        this.d = options.d
    }

    /**
     * getBBox 
     * { x: y: width: height:} 
     */
    calcBoxPoints () {
       let rect = this.target.getBBox()
       let x1 = rect.x
       let x2 = rect.x + rect.width / 2
       let x3 = rect.x + rect.width
       let y1 = rect.y
       let y2 = rect.y + rect.height / 2
       let y3 = rect.y + rect.height

       this.topLeft   = [x1, y1]
       this.topCenter = [x2, y1]
       this.topRight  = [x3, y1]

       this.midLeft   = [x2, y1]
       this.center    = [x2, y2]
       this.midRight  = [x2, y3]

       this.bottomLeft   = [x3, y1]
       this.bottomCenter = [x3, y2]
       this.bottomRight  = [x3, y3]
    }

    drawOutline (rect: any) {
        let path = `
                <path d="M${rect.x} ${rect.y} h${rect.width} v${rect.height} h${-rect.width} v${-rect.height}z" stroke-width=1 stroke="#4285f4"></path>
                <rect x="${this.topLeft[0]}" y="${this.topLeft[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.topCenter[0]}" y="${this.topCenter[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.topRight[0]}" y="${this.topRight[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.midLeft[0]}" y="${this.midLeft[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.midRight[0]}" y="${this.midRight[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.bottomLeft[0]}" y="${this.bottomLeft[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.bottomCenter[0]}" y="${this.bottomCenter[1]}" width="10" height="10" fill="#4285f4"></rect>
                <rect x="${this.bottomRight[0]}" y="${this.bottomRight[1]}" width="10" height="10" fill="#4285f4"></rect>
            `
        return parserSvgString(path)
    }
}