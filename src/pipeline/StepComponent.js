import React, { Component } from 'react';
import { StepTail, StepTop } from '../Common';

class StepComponent extends Component {

  constructor(props) {
    super(props);
    this.deleteStep = this.deleteStep.bind(this);
  }

  deleteStep() {
    console.log(this.props.step);
    this.props.deleteStep(this.props.step);
  }

  render() {
    var step = this.props.step;
    var output = step.getOutput();
    var message = null;
    var view = 'No preview available';
    var meta = 'Unknown type';
    var clazz = 'normal';
    var error = null;
    var interrupt = null;
    if (output == null) {
      clazz = 'error';
      error = "Something's gone wrong, this step didn't receive any input."
    } else if (output.type === 'error') {
      clazz = 'error';
      error = output.error;
    } else if (output.type === 'interrupt') {
      clazz = 'interrupt';
      interrupt = "The pipe is broken somewhere above.";
    } else if (!output.data) {
      view = 'NULL';
      meta = null;
    } else if (output.type === 'ByteStringBuffer') {
      message = <div className="message"><span className="ion-md-information-circle"/> Showing byte array as hex (no separator, lower case) - add an encode step to see another representation</div>;
      view = output.data.toHex();
      meta = 'Byte array, ' + output.data.length() + ' bytes';
    } else if (output.type === 'String') {
      view = output.data;
      meta = 'String, ' + output.data.length + ' characters';
    }

    clazz += ' step step-transform';
    var dataElement = null;
    var metaElement = null;
    var errorElement = null;
    var interruptElement = null;
    if (!error && !interrupt) {
      dataElement = <div className="data">{view}</div>;
      metaElement = <div className="meta">{meta}</div>;
    } else if (error) {
      errorElement = <div className="error"><span><span className="ionicon ion-ios-bug"/><br/>{error}</span></div>
    } else if (interrupt) {
      interruptElement = <div className="interrupt">{interrupt}</div>
    }

    return (
      <div className={clazz}>
        <StepTop/>
        <div className="step-header">
          <h4 className="pull-left">{this.props.step.constructor.title}</h4>
          <button className="pull-right delete" onClick={this.deleteStep}><span className="ion-md-close"/></button>
        </div>
        <div className="step-body">
          {message}
          {dataElement}
          {errorElement}
          {interruptElement}
          {metaElement}
        </div>
        <StepTail/>
      </div>
    );
  }

}

export default StepComponent;
