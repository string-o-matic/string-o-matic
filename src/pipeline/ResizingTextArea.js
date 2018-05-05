import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResizingTextArea extends Component {

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

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
        ref={this.textArea}>
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
    if (this.textArea.current) {
      this.textArea.current.style.height = 'auto';
      this.textArea.current.style.height = Math.min(600, this.textArea.current.scrollHeight) + 'px';
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
