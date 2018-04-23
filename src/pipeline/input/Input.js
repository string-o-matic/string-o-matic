import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StepTail } from '../../Common';
import TextInput from './TextInput';
import FileInput from './FileInput';
import './Input.css';

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = { type: 'text', direction: 'ltr' };
    this.clear = this.clear.bind(this);
    this.toggleDirection = this.toggleDirection.bind(this);
  }

  render() {
    let content = null;
    if (this.state.type === 'text') {
      content = <TextInput initialInput={this.props.initialInput} inputChange={this.props.inputChange} direction={this.state.direction} ref="textInput"/>;
    } else if (this.state.type === 'file') {
      content = <FileInput inputChange={this.props.inputChange} ref="fileInput"/>;
    }

    return (
      <div className="step step-input">
        <div className="step-header">
          <h4 className="pull-left">Input</h4>
          <div className="btn-group pull-right">
            <button className="btn-direction" onClick={this.toggleDirection} title="Direction">{this.state.direction.toUpperCase()}</button>
            <button className="btn-clear" onClick={this.clear} title="Clear"><span className="ion-ios-backspace"/></button>
            <button className={this.state.type === 'text' ? ' active' : ''} onClick={this.setType.bind(this, 'text')}><span className="ion-ios-keypad-outline"/> &nbsp;Text</button>
            <button className={this.state.type === 'file' ? ' active' : ''} onClick={this.setType.bind(this, 'file')}><span className="ion-ios-folder-open-outline"/> &nbsp;File</button>
            {/*<button className={this.state.type === 'rand' ? ' active' : ''} onClick={this.setType.bind(this, 'rand')}>Random</button>*/}
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
  }

  toggleDirection() {
    if (this.state.direction === 'rtl') {
      this.setState({ direction: 'ltr' });
    } else {
      this.setState({ direction: 'rtl' });
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

Input.propTypes = {
  initialInput: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired
};

export default Input;
