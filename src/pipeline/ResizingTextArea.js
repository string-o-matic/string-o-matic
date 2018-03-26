import React, { Component } from 'react';

class ResizingTextArea extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <textarea
        className="data"
        type="text"
        value={this.props.value}
        onChange={this.onChange}
        rows="1"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        readOnly={this.props.readOnly}
        ref="textarea">
      </textarea>
    );
  }

  componentDidMount() {
    this.adjustTextArea();
  }

  componentDidUpdate() {
    this.adjustTextArea();
  }

  onChange(e) {
    var value = e.target.value;
    this.props.onChange(value);
  }

  adjustTextArea() {
    if (this.refs.textarea) {
      this.refs.textarea.style.height = 'auto';
      this.refs.textarea.style.height = Math.min(600, this.refs.textarea.scrollHeight) + 'px';
    }
  }

}

export default ResizingTextArea;
