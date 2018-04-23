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
    let warning = null;
    // eslint-disable-next-line no-control-regex
    if (this.state.input.match(/[^\x09\x0a\x0d\x20-\x7e\xa0-\xac\xae-\xff\u00ff-\uffff]/g)) {
      warning = <div className="warning" key="warningX"><span className="ionicon ion-md-alert"/> Text contains unprintable characters</div>;
    }

    return (
      <div>
        <ResizingTextArea onChange={this.onChange} readOnly={false} value={this.state.input} direction={this.props.direction}/>
        <div className="meta">
          <div>String, {this.state.input.length} characters</div>
          {warning}
        </div>
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
  inputChange: PropTypes.func.isRequired,
  direction: PropTypes.string
};

export default TextInput;
