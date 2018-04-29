import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StepTail } from '../../Common';
import TextInput from './TextInput';
import FileInput from './FileInput';
import Globals from '../../Globals';
import './Input.css';

class Input extends Component {

  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  render() {
    let content = null;
    if (Globals.inputType === 'text') {
      content = <TextInput initialInput={this.props.initialInput} inputChange={this.props.inputChange} direction={Globals.inputDirection} ref="textInput"/>;
    } else if (Globals.inputType === 'file') {
      content = <FileInput inputChange={this.props.inputChange} ref="fileInput"/>;
    }

    return (
      <div className="step step-input">
        <div className="step-header">
          <h4 className="pull-left">Input</h4>
          <div className="btn-group pull-right">
            <button className="btn-clear" onClick={this.clear} title="Clear"><span className="ion-ios-backspace"/></button>
            <button className={Globals.inputType === 'text' ? ' active' : ''} onClick={this.setType.bind(this, 'text')}><span className="ion-ios-keypad-outline"/> &nbsp;Text</button>
            <button className={Globals.inputType === 'file' ? ' active' : ''} onClick={this.setType.bind(this, 'file')}><span className="ion-ios-folder-open-outline"/> &nbsp;File</button>
            {/*<button className={Globals.inputType === 'rand' ? ' active' : ''} onClick={this.setType.bind(this, 'rand')}>Random</button>*/}
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
    Globals.inputType = type;
    this.setState({ });
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

Input.propTypes = {
  initialInput: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired
};

export default Input;
