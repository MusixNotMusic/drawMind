export function drawElbowPath (x1: number, y1: number, x2: number, y2: number) {
    let path = ''
    if (x1 === x2 || y1 === y2) {
        path = `M${x1} ${y1} L${x2} ${y2}`
    } else {
        let dx = Math.abs(x2 - x1)
        let dy = Math.abs(y2 - y1)
        if (dx - dy >= 0) {
            let half_x = (x2 + x1) / 2
            path = `M${x1} ${y1} H${half_x} V${y2} H${x2}`
        } else {
            let half_y = (y2 + y1) / 2
            path = `M${x1} ${y1} V${half_y} H${x2} V${y2}`
        }
    }
    return path 
}