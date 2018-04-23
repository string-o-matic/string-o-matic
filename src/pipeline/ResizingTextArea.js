import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResizingTextArea extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    var className = 'data';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <textarea
        className={className}
        value={this.props.value}
        onChange={this.onChange}
        rows="1"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        readOnly={this.props.readOnly}
        dir={this.props.direction || 'ltr'}
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

ResizingTextArea.propTypes = {
  readOnly: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  direction: PropTypes.string
};

export default ResizingTextArea;
