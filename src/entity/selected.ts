import { parserSvgString } from '../dom/utils'
export default class SelectedRect {
    /**
     * 
     * margin = { top: 1, right: 1, bottom: 1, left: 1}
     * margin 外延 1像素
     * @param target 
     * @param d 
     */
    static drawOutline (target: SVGAElement, d?: string, id?: string) {
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
        let width = 5
        let height = 5
        let color = '#4285f4'
        let path = `
                <path d="M${x1} ${y1} L${x3} ${y1} ${x3} ${y3} ${x1} ${y3}z" stroke-width=1 stroke="${color}" fill="transparent"></path>
                <rect x="${topLeft[0] - width / 2}" y="${topLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${topCenter[0] - width / 2}" y="${topCenter[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${topRight[0] - width / 2}" y="${topRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}""></rect>
                <rect x="${midLeft[0] - width / 2}" y="${midLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${midRight[0] - width / 2}" y="${midRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${bottomLeft[0] - width / 2}" y="${bottomLeft[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${bottomCenter[0] - width / 2}" y="${bottomCenter[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
                <rect x="${bottomRight[0] - width / 2}" y="${bottomRight[1] - height / 2}" width="${width}" height="${height}" fill="${color}"></rect>
            `
        if (d) {
            target.querySelector('.ghost').setAttribute('d', d)
            target.querySelector('.ghost').setAttribute('stroke', color)
            target.querySelector('.ghost').setAttribute('stroke-width', '2.5')
        }
        document.body.querySelector('svg').append(parserSvgString(path, id))
    }
}