import { parserSvgString } from '../dom/utils'
export default class SelectedRect {
    /**
     * 
     * margin = { top: 1, right: 1, bottom: 1, left: 1}
     * margin 外延 1像素
     * @param target 
     * @param d 
     */
    static drawOutline (mem: any, d?: string, id?: string) {
        let target = mem.target.querySelector('.plane')
        let { 
            x1,
            x3,
            y1,
            y3,
            topLeft,
            topCenter,
            topRight,
            midLeft,
            center,
            midRight,
            bottomLeft,
            bottomCenter,
            bottomRight
        } = getOutlineRectPosition(target) 
        let width = 5
        let height = 5
        let color = '#4285f4'
        let outlineDom = document.querySelector('#' + id)
        let htmlStr = `
                <path id="outline-rect" d="M${x1} ${y1} L${x3} ${y1} ${x3} ${y3} ${x1} ${y3}z" stroke-width="1.5" stroke="${color}" fill="transparent" style="cursor: move;"></path>
                <rect id="outline-westnorth" x="${topLeft[0] - width / 2}" y="${topLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: nwse-resize;"></rect>
                <rect id="outline-north" x="${topCenter[0] - width / 2}" y="${topCenter[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: ns-resize;"></rect>
                <rect id="outline-eastnorth" x="${topRight[0] - width / 2}" y="${topRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: nesw-resize;"></rect>
                <rect id="outline-west" x="${midLeft[0] - width / 2}" y="${midLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: ew-resize;"></rect>
                <rect id="outline-east" x="${midRight[0] - width / 2}" y="${midRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: ew-resize;"></rect>
                <rect id="outline-westsouth" x="${bottomLeft[0] - width / 2}" y="${bottomLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: nesw-resize;"></rect>
                <rect id="outline-south" x="${bottomCenter[0] - width / 2}" y="${bottomCenter[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: ns-resize;"></rect>
                <rect id="outline-eastsouth" x="${bottomRight[0] - width / 2}" y="${bottomRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}" style="cursor: nwse-resize;"></rect>
            `
        if (outlineDom) {
            outlineDom.remove()
        }
        let outlineSVGDom = parserSvgString(htmlStr, id)
        document.body.querySelector('svg').append(outlineSVGDom)
    }
}
function getOutlineRectPosition (target: SVGAElement) {
    let rect = target.getBBox()
    let margin = { top: 1, right: 1, bottom: 1, left: 1}
    let x1 = rect.x - margin.right
    let x2 = rect.x + rect.width / 2 
    let x3 = rect.x + rect.width + margin.left
    let y1 = rect.y - margin.top
    let y2 = rect.y + rect.height / 2
    let y3 = rect.y + rect.height + margin.bottom

    let topLeft   = [x1, y1]
    let topCenter = [x2, y1]
    let topRight  = [x3, y1]

    let midLeft   = [x1, y2]
    let center    = [x2, y2]
    let midRight  = [x3, y2]

    let bottomLeft   = [x1, y3]
    let bottomCenter = [x2, y3]
    let bottomRight  = [x3, y3]
    return {
        x1,
        x2,
        x3,
        y1,
        y2,
        y3,
        topLeft,
        topCenter,
        topRight,
        midLeft,
        center,
        midRight,
        bottomLeft,
        bottomCenter,
        bottomRight
    }
}