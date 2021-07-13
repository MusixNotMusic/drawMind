import { degree2Radian, vectorDegree } from '../constants/math'
import { ArrowHeight, HalfArrowDegree, ArrowSlopEdge} from '../constants/constant'

export function drawArrowPath (x1: number, y1: number, x2: number, y2: number) {
    var alpha = vectorDegree(x1, y1, x2, y2)
    var beta1 = degree2Radian(alpha + HalfArrowDegree)
    var beta2 = degree2Radian(alpha - HalfArrowDegree)
    const path = `M${x2} ${y2} L${x2 + Math.cos(beta1) * ArrowSlopEdge} ${y2 + Math.sin(beta1) * ArrowSlopEdge} L${x2 + Math.cos(beta2) * ArrowSlopEdge} ${y2 + Math.sin(beta2) * ArrowSlopEdge} M${x2} ${y2} L${x1} ${y1}`
    return path 
}