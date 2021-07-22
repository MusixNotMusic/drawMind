import * as d3 from 'd3'
export default class MouseDefault {
   private svgDom: any;
   constructor (svgDom: any) {
    this.svgDom = svgDom
   }

   destroyEvent () {
       d3.select(this.svgDom).on('click', null)
   }

   registerEvent () {
        d3.select(this.svgDom).on('click', function(e) {
            console.log('click ==>', e.target)
        })
   }
}