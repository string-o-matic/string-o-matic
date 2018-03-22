import React, { Component } from 'react';
import MD5Step from './steps/MD5Step';
import HexStep from './steps/HexStep';
import { StepTop } from '../Common';

class StepSelector extends Component {

  render() {
    // TODO Add category static field and build automatically
    var encodeSteps = [ HexStep ];
    var hashSteps = [ MD5Step ];

    return (
      <div className="step-selector">
        <StepTop/>
        <div className="step-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 category">
                <h4>ENCODE</h4>
                {
                  encodeSteps.map((step, i) =>
                    <button key={i} className="btn btn-inverse btn-block" onClick={this.addStep.bind(this, step)}>{step.title}</button>
                  )
                }
              </div>
              <div className="col-md-3 category">
                <h4>STRING</h4>
              </div>
              <div className="col-md-3 category">
                <h4>HASH</h4>
                {
                  hashSteps.map((step, i) =>
                    <button key={i} className="btn btn-inverse btn-block" onClick={this.addStep.bind(this, step)}>{step.title}</button>
                  )
                }
              </div>
              <div className="col-md-3 category">
                <h4>ENCRYPT</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  addStep(step) {
    this.props.addStep(new step());
  }

}

export default StepSelector;
