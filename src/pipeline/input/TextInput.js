import React, { Component } from 'react';
import Data from '../Data';
import './Input.css'

class TextInput extends Component {

  constructor(props) {
    super(props);
    this.state = { input: this.props.initialInput };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <textarea
          className="data"
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          rows="1"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          ref="textarea">
        </textarea>
        <div className="meta">String, {this.state.input.length} characters</div>
      </div>
    );
  }

  componentDidMount() {
    this.adjustTextArea();
    this.props.inputChange(Data.string(this.state.input + ''));
  }

  componentDidUpdate() {
    this.adjustTextArea();
  }

  handleChange(e) {
    var value = e.target.value;
    this.props.inputChange(Data.string(value));
    this.setState({ input: value });
  }

  clear() {
    this.setState({ input: '' });
    this.props.inputChange(Data.string(''));
  }

  adjustTextArea() {
    if (this.refs.textarea) {
      this.refs.textarea.style.height = 'auto';
      this.refs.textarea.style.height = Math.min(600, this.refs.textarea.scrollHeight) + 'px';
    }
  }

}

export default TextInput;
