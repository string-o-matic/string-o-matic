import React, { Component } from 'react';
import { StepTail } from '../Common';
import Data from '../pipeline/Data';
import './Input.css'

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = { input: this.props.initialInput };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="step step-input">
        <div className="step-header">
          <h4 className="pull-left">Input</h4>
          <div className="btn-group pull-right">
            <button className="btn btn-sm btn-primary active">String</button>
            <button className="btn btn-sm btn-primary" disabled="disabled">Number</button>
            <button className="btn btn-sm btn-primary" disabled="disabled">File</button>
            <button className="btn btn-sm btn-primary" disabled="disabled">Random</button>
          </div>
        </div>
        <div className="step-body">
          <textarea
            className="code"
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            rows="4">
          </textarea>
          <div className="meta">String, {this.state.input.length} characters</div>
        </div>
        <StepTail/>
      </div>
    );
  }

  handleChange(e) {
    var value = e.target.value;
    this.props.inputChange(Data.string(value));
    this.setState({ input: value });
  }

}

export default Input;
