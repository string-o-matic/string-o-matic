import React, { Component } from 'react';
import { StepTail } from '../../Common';
import TextInput from './TextInput';
import FileInput from './FileInput';
import './Input.css'

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = { type: 'text' };
    this.clear = this.clear.bind(this);
  }

  render() {
    var content = null;
    if (this.state.type === 'text') {
      content = <TextInput initialInput={this.props.initialInput} inputChange={this.props.inputChange} ref="textInput"/>
    } else if (this.state.type === 'file') {
      content = <FileInput inputChange={this.props.inputChange} ref="fileInput"/>
    }

    return (
      <div className="step step-input">
        <div className="step-header">
          <h4 className="pull-left">Input</h4>
          <div className="btn-group pull-right">
            <button className="btn btn-sm btn-primary btn-clear" onClick={this.clear}><span className="ion-md-close-circle"/> Clear</button>
            <button className={"btn btn-sm btn-primary" + (this.state.type === 'text' ? ' active' : '')} onClick={this.setType.bind(this, 'text')}>Text</button>
            {/*<button className="btn btn-sm btn-primary" disabled="disabled">Number</button>*/}
            <button className={"btn btn-sm btn-primary" + (this.state.type === 'file' ? ' active' : '')} onClick={this.setType.bind(this, 'file')}>File</button>
            {/*<button className="btn btn-sm btn-primary" disabled="disabled">Random</button>*/}
          </div>
        </div>
        <div className="step-body">
          {content}
        </div>
        <StepTail/>
      </div>
    );
  }

  setType(type) {
    this.setState({type: type});
    if (type === 'text') {
      // this.props.inputChange(Data.string(this.state.textAreaInput));
    } else if (type === 'file') {
      // this.props.inputChange(Data.string(this.state.fileInput));
    }
  }

  clear() {
    if (this.refs.fileInput) {
      this.refs.fileInput.clear();
    }
    if (this.refs.textInput) {
      this.refs.textInput.clear();
    }
  }

}

export default Input;
