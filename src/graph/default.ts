import * as d3 from 'd3'
import SelectedRect from '../entity/selected'

export default class MouseDefault {
   private svgDom: any;
   private mem: any;
   constructor (panel: any, mem: any) {
    this.svgDom = panel.svgDom
    this.mem = mem
   }

   destroyEvent () {
       d3.select(this.svgDom).on('click', null)
   }

   registerEvent () {
        d3.select(this.svgDom).on('click', (e) => {
            if (e.target) {
                let dom = this.mem.find(e.target)
                if (dom) {
                    SelectedRect.drawOutline(e.target, null, 'outline')
                }
            }
        })
   }
}