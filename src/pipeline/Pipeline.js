import React, { Component } from 'react';
import Input from './input/Input';
import StepComponent from './StepComponent';
import StepSelector from './StepSelector';
import Data from './Data';

class Pipeline extends Component {

  initialInput = 'Grumpy wizards make toxic brew for the evil queen and jack';
  steps = [ ];

  constructor(props) {
    super(props);
    this.state = { input: Data.string(this.initialInput) };
    this.inputChange = this.inputChange.bind(this);
    this.stepChange = this.stepChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    // console.log('pipeline construct update pipeline');
    // this.updatePipelineChain();
    // console.log('pipeline construct set initial');
    // this.steps[0].setInput({ type: 'String', data: this.initialInput });
  }

  render() {
    return (
      <div>
        <Input inputChange={this.inputChange} initialInput={this.initialInput}/>
        {
          this.steps.map((step, i) =>
            <StepComponent key={i} step={step} deleteStep={this.deleteStep} stepChange={this.stepChange}/>
          )
        }
        <StepSelector addStep={this.addStep}/>
      </div>
    );
  }

  // updatePipelineChain() {
  //   var previous = null;
  //   this.steps.forEach(step => {
  //     if (previous) {
  //       previous.setNext(step);
  //     }
  //     previous = step;
  //   });
  // }

  inputChange(input) {
    // Pass new input to first step in pipeline. It will pass its output down the chain.
    console.log('input change', input);
    if (this.steps.length > 0) {
      this.steps[0].setInput(input);
    }
    this.setState({ input: input });
  }

  // Called from any step in the pipeline when an option has been changed in the step that
  // requires a recalculation of later steps.
  stepChange() {
    this.setState({});
  }

  addStep(step) {
    if (this.steps.length > 0) {
      this.steps[this.steps.length - 1].setNext(step);
    } else {
      step.setInput(this.state.input);
    }
    this.steps.push(step);
    this.setState({});
  }

  deleteStep(deleteStep) {
    var steps = [ ];
    this.steps.forEach(step => {
      if (step !== deleteStep) {
        if (steps.length > 0) {
          steps[steps.length - 1].setNext(step);
        } else {
          step.setInput(this.state.input)
        }
        steps.push(step);
      }
    });
    this.steps = steps;
    this.setState({});
  }
}

export default Pipeline;
