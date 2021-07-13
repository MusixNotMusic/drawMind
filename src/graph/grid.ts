import { cellWidth,  cellHeight } from '../constants/constant'
export function drawGridBackground (width: number, height: number, initPosition: boolean = true) {
    const px = Array(Math.ceil(height / cellHeight)).fill(`h${width}`).join(`m${-width},${cellWidth}`);
    const py = Array(Math.ceil(width / cellWidth)).fill(`v${height}`).join(`m${cellHeight},${-height}`);
  // Paths require an initial move command. It can be set either by this function
  // or appended to the returned path.
    return `${initPosition ? 'M0,0' : ''}${px}m${-width}${-height}${py}`;
}