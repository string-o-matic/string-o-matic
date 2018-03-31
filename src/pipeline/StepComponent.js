import React, { Component } from 'react';
import {StepTail, StepTop} from '../Common';
import StepForm from './steps/StepForm';
import ResizingTextArea from './ResizingTextArea';
import {StringType, BoolType, NullType, ByteStringBufferType} from './Types';
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
    content.push(<StepForm key="form" step={step} refresh={this.props.refresh}/>);
    if (output == null) {
      clazz = 'error';
      content.push(this.bug("Whoops! This step hasn't received any input. You've found a bug."));
    } else if (output.then) {
      content.push(this.data('Calculating...', 'calculating'));
      content.push(this.meta(['Unknown']));
      output.then(_ => this.setState({}));
    } else if (output.status === 'valid') {
      const meta = [];
      if (output.type === ByteStringBufferType) {
        content.push(this.data(output.data.toHex()));
        meta.push(<div><span>Byte array, {output.data.length()} bytes<br/>Displayed as hex - for other options add an encode step</span></div>);
      } else if (output.type === StringType) {
        content.push(this.data(output.data));
        meta.push(<div>String, {output.data.length} characters</div>);
      } else if (output.type === BoolType) {
        content.push(this.data(output.data ? 'TRUE' : 'FALSE', output.data ? 'true' : 'false'));
        meta.push(<div>Boolean</div>);
      } else if (output.type === NullType) {
        content.push(this.data('NULL'));
        meta.push(<div>NULL</div>);
      }
      output.warnings.forEach(w => meta.push(<div className="warning"><span className="ionicon ion-md-alert"/> {w}</div>));
      content.push(this.meta(meta));
    } else if (output.status === 'invalid') {
      clazz = 'error';
      content.push(this.error(output.message));
    } else if (output.status === 'bug') {
      clazz = 'error';
      content.push(this.bug("Whoops! This value couldn't be calculated. You've found a bug."));
    } else if (output.status === 'unsupported') {
      clazz = 'error';
      var supports = step.constructor.supports.map(s => s.display).join(', ');
      content.push(this.error(<span>This step can't convert {output.inputType.displayPlural} - supported types are: {supports}<br/><small>Try adding a conversion step</small></span>));
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

  data(content, className) {
    return <ResizingTextArea key="data" readOnly={true} value={content} className={className}/>;
  }

  meta(content) {
    return <div key="meta" className="meta">{content.map(c => c)}</div>;
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
