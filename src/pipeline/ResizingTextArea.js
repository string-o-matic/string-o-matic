import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResizingTextArea extends Component {

  render() {
    let className = 'data';
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

  adjustTextArea() {
    if (this.refs.textarea) {
      this.refs.textarea.style.height = 'auto';
      this.refs.textarea.style.height = Math.min(600, this.refs.textarea.scrollHeight) + 'px';
    }
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

}

ResizingTextArea.propTypes = {
  readOnly: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  direction: PropTypes.string
};

export default ResizingTextArea;
