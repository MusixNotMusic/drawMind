/**
 * 平面的抽象
 * 1、 平面由点组成
 * 2、 平面有 属性
 * 3、 平面移动 有 ghost
 *     ghost 具有二维矩形 位移的特征
 * 4、 平面 具有二维矩阵 移动的特性
 *   4.1、 x缩放 y缩放 固定点缩放
 *   4.2、 中心点旋转
 *   4.3、 整体平移
 * 5、平面具有的操作
 *   5.1、删除平面
 *   5.2、复制平面
 *   5.3、合并多个平面为一个组
 *   5.4、回撤操作
 */
import * as _ from 'lodash'
import { 
    defaultPlaceholderProps,
    defaultGhostProps
} from '../constants/defaultsProps'
import { lineTo } from '../path/line'
import { drawArrowPath } from '../path/arrowLine'
import { drawElbowPath } from '../path/elbow'
import { drawCurvePath } from '../path/curve'
import { loopLinePath  } from '../path/loopLine'
import { loopCurvePath } from '../path/loopCurve'
import { parserSvgString } from '../dom/utils'
// import { obj2PropsStr } from '../constants/utils'

export class Plane {
    private props: any;
    private ghostProps: any;
    private points: any = [];
    private target: any;
    private cmd: string;
    constructor(options: any) {
        this.props = _.defaults(options.doneProps || {}, defaultPlaceholderProps)
        this.ghostProps = _.defaults(options.ghostProps || {}, defaultGhostProps)
        this.points = options.points || []
        this.target = options.target || null
        this.cmd = options.cmd
    }

    definePathByCmd (points?: any, cmd?: string) {
        let _cmd = cmd || this.cmd
        let _points = points || this.points
        let d = ''
        switch(_cmd) {
            case 'lineTo':
                d = lineTo(_points[0][0], _points[0][1], _points[1][0], _points[1][1])
                break;
            case 'arrow':
                d = drawArrowPath(_points[0][0], _points[0][1], _points[1][0], _points[1][1])
                break;
            case 'elbow':
                d = drawElbowPath(_points[0][0], _points[0][1], _points[1][0], _points[1][1])
                break;
            case 'curve':
                d = drawCurvePath(_points[0][0], _points[0][1], _points[1][0], _points[1][1])
                break;
            case 'loopLine':
                d = loopLinePath(_points)
                break;
            case 'loopCurve':
                d = loopCurvePath(_points)
                break;
        }
        return d
    }

    createDom (points: any, props: string[]) {
        this.target = parserSvgString(`<path d="${this.definePathByCmd(points)}"}></path>`)
        this.updateProps(props)
        this.target.addEventListener('click', this.elementClick)
        return this.target
    }

    updateDom (points: any, props: string[]) {
        this.updatePath(points)
        this.updateProps(props)
        return this.target
    }

    updatePath (points: []) {
        if (this.target) {
            this.points = points
            this.target.querySelector('path').setAttribute('d', this.definePathByCmd())
        }
        return this.target
    }

    updateProps (props: string[], exclude = ['d']) {
        if (this.target) {
            this.props = props
            let $path = this.target.querySelector('path')
            Object.entries(this.props).forEach((props: any) => {
                if (!exclude.includes(props[0])) {
                  $path.setAttribute(props[0], props[1])
                }
            })
        }
        return this.target
    }

    removeProps (exclude = ['d']) {
        if (this.target) {
          let $path = this.target.querySelector('path')
          Object.values($path.attributes).forEach((propName: string) => {
              if (!exclude.includes(propName)) {
                $path.setAttribute(propName, '')
              }
          })
        }
        return this.target
    }

    elementClick (event: any) {
        event.preventDefault()
        let box = event.target.getBBox()
        console.log('box ==>', box)
    }
}