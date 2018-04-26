import React, { Component } from 'react';
import Input from './input/Input';
import StepComponent from './StepComponent';
import StepSelector from './StepSelector';
import Data from './Data';
import Globals from '../Globals';

class Pipeline extends Component {

  initialInput = 'Grumpy wizards make toxic brew for the evil queen and jack';

  constructor(props) {
    super(props);
    this.state = { input: Data.string(this.initialInput) };
    this.inputChange = this.inputChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.injectStepBefore = this.injectStepBefore.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  render() {
    return (
      <div>
        <Input inputChange={this.inputChange} initialInput={this.initialInput}/>
        {
          Globals.steps.map(step =>
            <StepComponent key={step.key} step={step} deleteStep={this.deleteStep} injectStepBefore={this.injectStepBefore} refresh={this.refresh}/>
          )
        }
        <StepSelector addStep={this.addStep}/>
      </div>
    );
  }

  inputChange(input) {
    // Pass new input to first step in pipeline. It will pass its output down the chain.
    if (Globals.steps.length > 0) {
      Globals.steps[0].setInput(input);
    }
    this.setState({ input: input });
  }

  // Called from any step in the pipeline when an option has been changed in the step that
  // requires a recalculation of later steps.
  refresh() {
    this.setState({});
  }

  addStep(step) {
    if (Globals.steps.length > 0) {
      Globals.steps[Globals.steps.length - 1].setNext(step);
    } else {
      step.setInput(this.state.input);
    }
    Globals.steps.push(step);
    this.setState({});
  }

  injectStepBefore(thisStep, newStep) {
    const steps = [ ];
    const pushStep = (step) => {
      step.setNext(null);
      if (steps.length > 0) {
        steps[steps.length - 1].setNext(step);
      } else {
        step.setInput(this.state.input);
      }
      steps.push(step);
    };
    Globals.steps.forEach(step => {
      if (step === thisStep) {
        pushStep(newStep);
      }
      pushStep(step);
    });
    Globals.steps = steps;
    this.setState({});
  }

  deleteStep(deleteStep) {
    const steps = [ ];
    Globals.steps.forEach(step => {
      if (step !== deleteStep) {
        step.setNext(null);
        if (steps.length > 0) {
          steps[steps.length - 1].setNext(step);
        } else {
          step.setInput(this.state.input);
        }
        steps.push(step);
      }
    });
    Globals.steps = steps;
    this.setState({});
  }
}

export default Pipeline;
