import { parserSvgString } from '../dom/utils'
import * as d3 from 'd3'
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
        this.target = options.target || {}
        this.d = options.d || {}
        this.calcBoxPoints()
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

       this.midLeft   = [x1, y2]
       this.center    = [x2, y2]
       this.midRight  = [x3, y2]

       this.bottomLeft   = [x1, y3]
       this.bottomCenter = [x2, y3]
       this.bottomRight  = [x3, y3]
    }

    drawOutline () {
        let rect = this.target.getBBox()
        let width = 5
        let height = 5
        let color = '#4285f4'
        let path = `
                <path d="M${rect.x} ${rect.y} h${rect.width} v${rect.height} h${-rect.width} v${-rect.height}z" stroke-width=1 stroke="${color}" fill="transparent"></path>
                <rect x="${this.topLeft[0] - width / 2}" y="${this.topLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${this.topCenter[0] - width / 2}" y="${this.topCenter[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${this.topRight[0] - width / 2}" y="${this.topRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}""></rect>
                <rect x="${this.midLeft[0] - width / 2}" y="${this.midLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${this.midRight[0] - width / 2}" y="${this.midRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${this.bottomLeft[0] - width / 2}" y="${this.bottomLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${this.bottomCenter[0] - width / 2}" y="${this.bottomCenter[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${this.bottomRight[0] - width / 2}" y="${this.bottomRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
            `
        this.target.querySelector('.ghost').setAttribute('d', this.d)
        this.target.querySelector('.ghost').setAttribute('stroke', color)
        this.target.querySelector('.ghost').setAttribute('stroke-width', 2.5)
        document.body.querySelector('svg').append(parserSvgString(path))
    }
}