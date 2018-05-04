import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  timeout = null;

  componentDidUpdate() {
    if (this.props.message && this.props.message !== this.state.message) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setState({ className: 'slide-out' });
      }, 3000);
      this.setState({ message: this.props.message, className: 'slide-in' });
    }
  }

  render() {
    if (this.state.message) {
      return (
        <div className={'toast ' + this.state.className + ' ' + (this.state.message.className || '')}>
          {this.state.message.text}
        </div>
      );
    } else {
      return null;
    }
  }

}

Toast.propTypes = {
  message: PropTypes.object
};

export default Toast;
