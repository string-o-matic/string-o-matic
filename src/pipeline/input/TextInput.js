import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Data from '../Data';
import ResizingTextArea from '../ResizingTextArea';
import './Input.css';

class TextInput extends Component {

  constructor(props) {
    super(props);
    this.state = { input: this.props.initialInput };
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div>
        <ResizingTextArea onChange={this.onChange} readOnly={false} value={this.state.input}/>
        <div className="meta">String, {this.state.input.length} characters</div>
      </div>
    );
  }

  componentDidMount() {
    this.props.inputChange(Data.string(this.state.input + ''));
  }

  onChange(value) {
    this.props.inputChange(Data.string(value));
    this.setState({ input: value });
  }

  clear() {
    this.setState({ input: '' });
    this.props.inputChange(Data.string(''));
  }

}

TextInput.propTypes = {
  initialInput: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired
};

export default TextInput;
