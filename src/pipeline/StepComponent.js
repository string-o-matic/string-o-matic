import React, { Component } from 'react';
import { StepTail, StepTop } from '../Common';

class StepComponent extends Component {

  render() {
    var step = this.props.step;
    var output = step.getOutput();
    var message = null;
    var view = 'No preview available';
    var meta = 'Unknown type';
    if (output == null || output.data == null) {
      view = 'NULL';
      meta = 'null';
    } else if (output.type === 'ByteStringBuffer') {
      message = <div className="message"><span className="ion-md-information-circle"/> Showing byte array as hex (no separator, lower case) - add an encode step to see another representation</div>;
      view = output.data.toHex();
      meta = 'Byte array, ' + output.data.length() + ' bytes';
    } else if (output.type === 'String') {
      view = output.data;
      meta = 'String, ' + output.data.length + ' characters';
    }


    return (
      <div className="step step-transform">
        <StepTop/>
        <div className="step-header">
          <h4>{this.props.step.constructor.title}</h4>
        </div>
        <div className="step-body">
          {message}
          <div className="data">{view}</div>
          <div className="meta">{meta}</div>
        </div>
        <StepTail/>
      </div>
    );
  }

}

export default StepComponent;
