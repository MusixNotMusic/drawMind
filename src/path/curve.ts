export function drawCurvePath (x1: number, y1: number, x2: number, y2: number) {
    let path = ''
    if (x1 === x2 || y1 === y2) {
        path = `M${x1} ${y1} L${x2} ${y2}`
    } else {
        let dx = Math.abs(x2 - x1)
        let dy = Math.abs(y2 - y1)
        let _5 = 5 ** 0.5
        if (dx - dy >= 0) {
            let x_anchor_1 = (_5 - 1) * (x2 + _5 * x1) / 4
            let x_anchor_2 = (_5 - 1) * (_5 * x2 + x1) / 4
            let half_x = (x2 + x1) / 2
            let half_y = (y2 + y1) / 2
            path = `M${x1} ${y1} Q${x_anchor_1} ${y1} ${half_x} ${half_y} Q${x_anchor_2} ${y2} ${x2} ${y2}`
        } else {
            let y_anchor_1 = (_5 - 1) * (y2 + _5 * y1) / 4
            let y_anchor_2 = (_5 - 1) * (_5 * y2 + y1) / 4
            let half_x = (x2 + x1) / 2
            let half_y = (y2 + y1) / 2
            path = `M${x1} ${y1} Q${x1} ${y_anchor_1} ${half_x} ${half_y} Q${x2} ${y_anchor_2} ${x2} ${y2}`
        }
    }
    return path 
}