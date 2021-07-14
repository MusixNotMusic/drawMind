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
    defaultDoneProps,
    defaultGhostProps
} from '../constants/defaultsProps'
import { lineTo } from '../path/line'
import { drawArrowPath } from '../path/arrowLine'
import { drawElbowPath } from '../path/elbow'
import { drawCurvePath } from '../path/curve'
import { loopLinePath  } from '../path/loopLine'
import { loopCurvePath } from '../path/loopCurve'
import { parserSvgString } from '../dom/utils'
import { obj2Str } from '../constants/utils'

export class Plane {
    private placeholderProps: any;
    private doneProps: any;
    private ghostProps: any;
    private points: any = [];
    private target: any;
    private cmd: string;
    constructor(options: any) {
        this.placeholderProps = _.defaults(options.placeholderProps || {}, defaultPlaceholderProps)
        this.doneProps = _.defaults(options.doneProps || {}, defaultDoneProps)
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

    createPlaceholderDom (points: []) {
        this.target = parserSvgString(`<path d="${this.definePathByCmd(points)}" ${obj2Str(this.placeholderProps)}></path>`)
        return this.target
    }

    createDoneDom (points: []) {
        this.target = parserSvgString(`<path d="${this.definePathByCmd(points)}" ${obj2Str(this.doneProps)}></path>`)
        return this.target
    }

    updatePath (points: []) {
        this.points = points
        this.target.querySelector('path').setAttribute('d', this.definePathByCmd())
        return this.target
    }
}