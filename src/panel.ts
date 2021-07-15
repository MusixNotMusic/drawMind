import * as d3 from 'd3'
// import Lifecycle from './event/Lifecycle'
import { PanelHeight, PanelWidth } from './constants/constant'
import { drawGridBackground } from "./graph/grid";
import Line from './graph/line'
import Arrow from './graph/arrow'
import ElbowLink from './graph/elbowLink'
import CurveLink from './graph/curveLink'
import MultiLine from './graph/multiLine'
import MultiCurve from './graph/multiCurve'

export default class Panel {
 private panel: any = null;
 private drawInstance: any = null;
 public ns: string = 'http://www.w3.org/2000/svg'
 private svgDom: any;
 private container: any;
 private background: any;
 create(opt: any) {
    this.container = d3.select(document.body)
        .append('div')
        .attr('id', 'panel')
        .attr('class', 'panel-container')
        .node()

    let clientWidth = this.container.clientWidth
    let clientHeight = this.container.clientHeight
    this.panel = this.createSvgDom(clientWidth, clientHeight)
    this.container.append(this.panel)
    
    const path = `M${0},${0}${drawGridBackground(clientWidth, clientHeight, false)}`;
    this.background = d3.select(this.panel).append('path').attr('stroke', '#cecece').attr('stroke-width', '0.8').attr('d', path).node()
    window.addEventListener('resize', this.resize.bind(this), false)
 }

 createSvgDom(viewBoxWidth: number, viewBoxHeight: number) {
    this.svgDom = document.createElementNS(this.ns, 'svg')
    this.svgDom.setAttribute('xmlns', this.ns)
    this.svgDom.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
    this.svgDom.setAttribute('width', '100%')
    this.svgDom.setAttribute('height', '100%')
    return this.svgDom
 }

 resize () {
    console.log('123123')
    let clientWidth = this.container.clientWidth
    let clientHeight = this.container.clientHeight
    this.svgDom.setAttribute('viewBox', `0 0 ${clientWidth} ${clientHeight}`)
    const path = `M${0},${0}${drawGridBackground(clientWidth, clientHeight, false)}`;
    this.background.setAttribute('d', path)
 }

 switchMode (mode: string) {
     console.log('switchMode', this.panel)
    if (this.drawInstance) {
        this.drawInstance.destroyEvent()
    }
    switch(mode){
        case 'line': 
            this.drawInstance = new Line(this.panel)
            this.drawInstance.registerEvent()
            break;
        case 'arrow': 
            this.drawInstance = new Arrow(this.panel)
            this.drawInstance.registerEvent()
            break;
        case 'elbow': 
            this.drawInstance = new ElbowLink(this.panel)
            this.drawInstance.registerEvent()
            break;
        case 'curve': 
            this.drawInstance = new CurveLink(this.panel)
            this.drawInstance.registerEvent()
            break;
        case 'multiLine': 
            this.drawInstance = new MultiLine(this.panel)
            this.drawInstance.registerEvent()
            break;
        case 'multiCurve': 
            this.drawInstance = new MultiCurve(this.panel)
            this.drawInstance.registerEvent()
            break;
    }
 }

 destroy () {
    window.removeEventListener('resize', null)
 }
}