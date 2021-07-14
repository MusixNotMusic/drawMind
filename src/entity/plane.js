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
import {} from '../constants/defaultsProps'
export class Plane {
    constructor(options) {
        this.placeholderProps = _.defaults(options.placeholderProps || {}, defaultPlaceholderProps)
        this.doneProps = _.defaults(options.doneProps || {}, defaultDoneProps)
        this.ghostProps = _.defaults(options.ghostProps || {}, defaultGhostProps)
        this.points = options.points || []
        this.target = options.target || null
    }


}