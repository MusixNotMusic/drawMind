/**
 * @param degree 角度
 * 角度 转 弧度 
 */
export function degree2Radian (degree: number) {
    return Math.PI * ( degree / 180)
} 

/**
 * @param 弧度 角度
 * 弧度 转 角度 
 */
export function radian2Degree (radian: number) {
    return radian / Math.PI * 180
} 

/**
 * 
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @description 向量角度
 */
export function vectorDegree (x1: number, y1: number, x2: number, y2: number) {
    var dy = y2 - y1;
    var dx = x2 - x1;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

/**
 * 
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @description 向量弧度
 */
export function vectorRadian (x1: number, y1: number, x2: number, y2: number) {
    return degree2Radian(vectorDegree(x1, y1, x2, y2))
}

/**
 * 
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @description 向量Mod 取模
 */
export function vectorMod (x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(dx(x1, x2) ** 2 + dy(y1, y2) ** 2)
}

/**
 * 
 * @param x1 
 * @param x2 
 * @description x方向 diffX
 */
export function dx (x1: number, x2: number) {
    return x2 - x1
}

/**
 * 
 * @param y1 
 * @param y2 
 * @description y方向 diffY
 */
export function dy (y1: number, y2: number) {
    return y2 - y1
}
