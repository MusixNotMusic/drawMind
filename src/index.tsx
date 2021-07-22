import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Panel from './panel'

import '@/assets/scss/style.scss';
let panel = new Panel()

const mode = ['line', 'arrow', 'elbow', 'curve', 'multiLine', 'multiCurve', 'mouse']

const modeList = mode.map((item, index)=> {
    return <div className="handle-item" key={index} onClick={() => { panel.switchMode(item) }}>{item}</div>
})
const App = () => {
  return <div className="control-box">
      {modeList}
  </div>;
};

const div = document.createElement('div')
div.setAttribute('id', 'root')
document.body.append(div)
ReactDOM.render(<App />, document.getElementById('root'));

panel.create({})