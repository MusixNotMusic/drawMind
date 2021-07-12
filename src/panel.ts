import * as d3 from 'd3'
// import Lifecycle from './event/Lifecycle'
import { PanelHeight, PanelWidth, Margin} from './constants/box'
import { drawGridBackground } from "./graph/grid";
import Line from './graph/line'
import Arrow from './graph/arrow'
import ElbowLink from './graph/elbowLink'
import CurveLink from './graph/curveLink'
import MultiLine from './graph/multiLine'
import MultiCurve from './graph/multiCurve'

export default class Panel {
 private panel: any = null;
 private mx = PanelWidth / 2 * Margin
 private my = PanelHeight / 2 * Margin
 private drawInstance: any = null;
 public ns: string = 'http://www.w3.org/2000/svg'
 private svgDom: any;
 create(opt: any) {
    this.panel = this.createSvgDom()
    d3.select(document.body)
        .append('div')
        .attr('id', 'panel')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .node()
        .append(this.panel)
    console.log(this.panel)
    const path = `M${this.mx},${this.my}${drawGridBackground(PanelWidth - this.mx * 2, PanelHeight - this.my * 2, false)}`;
    d3.select(this.panel)
        .append('path')
        .attr('stroke', '#ccc')
        .attr('d', path)
 }

 createSvgDom() {
    this.svgDom = document.createElementNS(this.ns, 'svg')
    this.svgDom.setAttribute('xmlns', this.ns)
    this.svgDom.setAttribute('viewBox', `0 0 ${PanelWidth} ${PanelHeight}`)
    this.svgDom.setAttribute('width', PanelWidth)
    this.svgDom.setAttribute('height', PanelHeight)
    return this.svgDom
 }

 switchMode (mode: string) {
     console.log('switchMode', this.panel)
    if (this.drawInstance) {
        this.drawInstance.destroyEvent()
        // this.drawInstance.target.remove()
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
            // this.drawInstance.created(this.panel)
            this.drawInstance.registerEvent()
            break;
        case 'multiCurve': 
            this.drawInstance = new MultiCurve(this.panel)
            // this.drawInstance.created(this.panel)
            this.drawInstance.registerEvent()
            break;
    }
 }

 destroy () {

 }
}