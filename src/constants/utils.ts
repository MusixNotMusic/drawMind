export function getDomOffset(dom: any): Object {
    // console.log('offset dom', dom)
    if (dom) {
      if (dom.offsetTop === undefined) {
         return getDomOffset(dom.parentNode)
      } else {
         return {
           offsetTop: dom.offsetTop,
           offsetRight: dom.offsetRight,
           offsetBottom: dom.offsetBottom,
           offsetLeft: dom.offsetLeft,
         }
      }
    } else {
        return {
          offsetTop: 0,
          offsetRight: 0,
          offsetBottom: 0,
          offsetLeft: 0
        }
    }
  }