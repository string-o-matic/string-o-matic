import React, { Component } from 'react';
import { StepTail, StepTop } from '../Common';
import './StepComponent.css';

class StepComponent extends Component {

  constructor(props) {
    super(props);
    this.deleteStep = this.deleteStep.bind(this);
  }

  deleteStep() {
    this.props.deleteStep(this.props.step);
  }

  render() {
    var step = this.props.step;
    var output = step.getOutput();
    var clazz = 'normal';
    var content = [];
    if (output == null) {
      clazz = 'error';
      content.push(this.bug("Whoops! This step hasn't received any input. You've found a bug."));
    } else if (output.status === 'valid') {
      if (output.type === 'ByteStringBuffer') {
        content.push(this.data(output.data.toHex()));
        content.push(this.meta(<span>Byte array, {output.data.length()} bytes<br/>Displayed as hex - for other options add an encode step</span>));
      } else if (output.type === 'String') {
        content.push(this.data(output.data));
        content.push(this.meta('String, ' + output.data.length + ' characters'));
      } else if (output.type === 'null') {
        content.push(this.data('NULL'));
        content.push(this.meta('NULL'));
      }
    } else if (output.status === 'bug') {
      clazz = 'error';
      content.push(this.bug("Whoops! This value couldn't be calculated. You've found a bug."));
    } else if (output.status === 'error') {
      clazz = 'error';
      // TODO message
    } else if (output.status === 'broken-pipe') {
      clazz = 'broken-pipe';
      content.push(this.brokenPipe());
    }

    clazz += ' step step-transform';

    return (
      <div className={clazz}>
        <StepTop/>
        <div className="step-header">
          <h4 className="pull-left">{this.props.step.constructor.title}</h4>
          <button className="pull-right delete" onClick={this.deleteStep}><span className="ion-md-close"/></button>
        </div>
        <div className="step-body">
          {content.map(c => c)}
        </div>
        <StepTail/>
      </div>
    );
  }

  data(content) {
    return <div key="data" className="data">{content}</div>
  }

  meta(content) {
    return <div key="meta" className="meta">{content}</div>;
  }

  error(content) {
    return <div key="error" className="error">{content}</div>;
  }

  bug(content) {
    return <div key="bug" className="error"><span className="ionicon ion-ios-bug"/><br/>{content}<br/><small>You might find the cause in your browser's console log.</small></div>;
  }

  brokenPipe() {
    return <div key="broken-pipe" className="broken-pipe">Can't show this step due to errors above</div>;
  }

}

export default StepComponent;
