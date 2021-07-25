import * as d3 from 'd3'
import { EventEmitter } from 'eventemitter3'
import { drawGridBackground } from "./action/grid";
import Line from './action/line'
import Arrow from './action/arrow'
import ElbowLink from './action/elbowLink'
import CurveLink from './action/curveLink'
import MultiLine from './action/multiLine'
import MultiCurve from './action/multiCurve'
import MouseDefault from './action/point'
import Memory from './store/mem'

// 
export default class Panel {
 private drawInstance: any = null;
 public ns: string = 'http://www.w3.org/2000/svg'
 private svgDom: any;
 private container: any;
 private background: any;
 private memory: any;
 private $eventemit: any;
 constructor() {
    this.$eventemit = new EventEmitter();
    this.memory = new Memory(this)
 }

 create(opt: any) {
    this.container = d3.select(document.body)
        .append('div')
        .attr('id', 'panel')
        .attr('class', 'panel-container')
        .node()

    let clientWidth = this.container.clientWidth
    let clientHeight = this.container.clientHeight
    this.createSvgDom(clientWidth, clientHeight)
    this.container.append(this.svgDom)
    // draw background
    this.drawBackground(clientWidth, clientHeight)
    window.addEventListener('resize', this.resize.bind(this), false)
    this.registerEvent()
 }

 createSvgDom(viewBoxWidth: number, viewBoxHeight: number) {
    this.svgDom = document.createElementNS(this.ns, 'svg')
    this.svgDom.setAttribute('xmlns', this.ns)
    this.svgDom.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
    this.svgDom.setAttribute('width', '100%')
    this.svgDom.setAttribute('height', '100%')
    this.svgDom.setAttribute('pointer-events', 'visiblePainted')
    return this.svgDom
 }

 resize () {
    let clientWidth = this.container.clientWidth
    let clientHeight = this.container.clientHeight
    this.svgDom.setAttribute('viewBox', `0 0 ${clientWidth} ${clientHeight}`)
    const path = `M${0},${0}${drawGridBackground(clientWidth, clientHeight, false)}`;
    this.background.setAttribute('d', path)
 }
 /**
  * @note https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events
  * @param clientWidth 
  * @param clientHeight 
  */
 drawBackground (clientWidth: number, clientHeight: number) {
    const path = `M${0},${0}${drawGridBackground(clientWidth, clientHeight, false)}`;
    this.background = d3.select(this.svgDom)
        .append('path')
        .attr('stroke', '#cecece')
        .attr('stroke-width', '0.8')
        .attr('pointer-events', 'none')
        .attr('d', path)
        .node()
 }

 switchMode (mode: string) {
     console.log('switchMode', this.drawInstance)
    if (this.drawInstance) {
        this.drawInstance.destroyEvent()
        this.drawInstance = null
    }
    switch(mode){
        case 'line': 
            this.drawInstance = new Line(this)
            break;
        case 'arrow': 
            this.drawInstance = new Arrow(this)
            break;
        case 'elbow': 
            this.drawInstance = new ElbowLink(this)
            break;
        case 'curve': 
            this.drawInstance = new CurveLink(this)
            break;
        case 'multiLine': 
            this.drawInstance = new MultiLine(this)
            break;
        case 'multiCurve': 
            this.drawInstance = new MultiCurve(this)
            break;
        case 'mouse': 
            this.drawInstance = new MouseDefault(this, this.memory)
            break;
    }
    this.drawInstance.registerEvent()
 }

 registerEvent() {
    this.$eventemit.on('selected-move-done', () => {
        let dom = this.svgDom.querySelector('#outline')
        if (dom) {
         dom.remove()
        }
    }, this)
 }

 destroy () {
    window.removeEventListener('resize', null)
 }
}