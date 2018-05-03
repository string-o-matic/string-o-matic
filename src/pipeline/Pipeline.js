import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from './input/Input';
import StepComponent from './StepComponent';
import StepSelector from './StepSelector';
import Data from './Data';
import Globals from '../Globals';
import {StringType} from './Types';
import './Pipeline.css';
/* globals document */

class Pipeline extends Component {

  constructor(props) {
    super(props);
    this.state = { input: Data.string(Globals.textInput) };
    this.inputChange = this.inputChange.bind(this);
    this.addStep = this.addStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.injectStepBefore = this.injectStepBefore.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    document.title = Globals.title;
  }

  /**
   * Override in subclass to add an intro to a precomposed pipeline page.
   */
  precomposedIntro() {
    return null;
  }

  /**
   * Override in subclass add call {@link this.addStep} to build up a precomposed pipeline.
   */
  buildPrecomposedPipeline() {

  }

  render() {
    let outputType = StringType;
    if (Globals.steps.length > 0) {
      outputType = Globals.steps[Globals.steps.length - 1].constructor.output || outputType;
    } else if (this.state.input) {
      outputType = this.state.input.type;
    }

    return (
      <div>
        {this.precomposedIntro()}
        <Input inputChange={this.inputChange} initialInput={Globals.textInput}/>
        {
          Globals.steps.map(step =>
            <StepComponent key={step.key} step={step} deleteStep={this.deleteStep} injectStepBefore={this.injectStepBefore} refresh={this.refresh}/>
          )
        }
        <StepSelector addStep={this.addStep} type={outputType}/>
        <div className="precomposed">
          <h3>Here are some we made earlier...</h3>
          <p>
            These links will take you to pages with ready-made transformation pipelines using the most common options.
            Each page has instructions so if you&apos;re confused or in a hurry they&apos;re a great way to get started.
            They probably help our Google search ranking too, so everybody wins.
          </p>
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Link to="/aes-encrypt" className="encryption">AES Encrypt as Base64 or Hex</Link>
              <Link to="/aes-decrypt" className="encryption">AES Decrypt from Base64 or Hex</Link>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Link to="/md5" className="hash">MD5 Hash</Link>
              <Link to="/sha1" className="hash">SHA-1 Hash</Link>
              <Link to="/sha256" className="hash">SHA-256 Hash</Link>
              <Link to="/bcrypt" className="hash">BCrypt Hash</Link>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Link to="/html-escape" className="escape">HTML Escape</Link>
              <Link to="/html-unescape" className="escape">HTML Unescape</Link>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Link to="/upper-case" className="case">Upper Case</Link>
              <Link to="/lower-case" className="case">Lower Case</Link>
              <Link to="/title-case" className="case">Title Case</Link>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Link to="/base64-encode" className="encode">Base64 Encode</Link>
              <Link to="/hex-encode" className="encode">Hex Encode</Link>
              <Link to="/decimal-encode" className="encode">Decimal Encode</Link>
              <Link to="/binary-encode" className="encode">Binary Encode</Link>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <Link to="/base64-decode" className="decode">Base64 Decode</Link>
              <Link to="/hex-decode" className="decode">Hex Decode</Link>
              <Link to="/decimal-decode" className="decode">Decimal Decode</Link>
              <Link to="/binary-decode" className="decode">Binary Decode</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (Globals.steps.length === 0) {
      this.buildPrecomposedPipeline();
    }
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
