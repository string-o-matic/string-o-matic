import React, { Component } from 'react';
import Input from '../input/Input';
import StepComponent from './StepComponent';
import MD5Step from './steps/MD5Step';
import HexStep from './steps/HexStep';
import StringReverseStep from './steps/StringReverseStep';
import IdentityStep from './steps/IdentityStep';

class Pipeline extends Component {

  initialInput = 'Grumpy wizards make toxic brew for the evil queen and jack';
  steps = [ new MD5Step(), new HexStep(), new StringReverseStep(), new IdentityStep() ];

  constructor(props) {
    super(props);
    this.state = { input: this.initialInput };
    this.inputChange = this.inputChange.bind(this);
    this.stepChange = this.stepChange.bind(this);
    console.log('pipeline construct update pipeline');
    this.updatePipelineChain();
    console.log('pipeline construct set initial');
    this.steps[0].setInput({ type: 'String', data: this.initialInput });
  }

  render() {
    return (
      <div>
        <Input inputChange={this.inputChange} initialInput={this.initialInput}/>
        {
          this.steps.map((step, i) =>
            <StepComponent key={i} step={step} stepChange={this.stepChange}/>
          )
        }
      </div>
    );
  }

  updatePipelineChain() {
    var previous = null;
    this.steps.forEach(step => {
      if (previous) {
        previous.setNext(step);
      }
      previous = step;
    });
  }

  inputChange(input) {
    // Pass new input to first step in pipeline. It will pass its output down the chain.
    console.log('input change', input);
    this.steps[0].setInput(input);
    this.setState({ input: input });
  }

  // Called from any step in the pipeline when an option has been changed in the step that
  // requires a recalculation of later steps.
  stepChange() {
    this.setState({});
  }
}

export default Pipeline;