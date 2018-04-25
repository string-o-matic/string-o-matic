import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Data from '../Data';
import ResizingTextArea from '../ResizingTextArea';
import Globals from '../../Globals';
import './Input.css';

class TextInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    let warning = null;
    // eslint-disable-next-line no-control-regex
    if (Globals.textInput.match(/[^\x09\x0a\x0d\x20-\x7e\xa0-\xac\xae-\xff\u00ff-\uffff]/g)) {
      warning = <div className="warning" key="warningX"><span className="ionicon ion-md-alert"/> Text contains unprintable characters</div>;
    }
    let info = null;
    if (Globals.textInput.match(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\uFE00-\uFE0F\uD800-\uDBFF\uDC00-\uDFFF]/g)) {
      info = <div>String, ~{Globals.textInput.length} characters. <span className="ion-md-information-circle"/> Contains combining characters, variation selectors or surrogate pairs.</div>;
    } else {
      info = <div>String, {Globals.textInput.length} characters</div>;
    }

    return (
      <div>
        <ResizingTextArea onChange={this.onChange} readOnly={false} value={Globals.textInput} direction={this.props.direction}/>
        <div className="meta">
          {info}
          {warning}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.send(Globals.textInput + '');
  }

  onChange(value) {
    Globals.textInput = value;
    this.setState({ });
    this.send(value);
  }

  clear() {
    Globals.textInput = '';
    this.setState({ });
    this.send('');
  }

  send(value) {
    this.props.inputChange(Data.string(value).withSequence(++Globals.inputSequence));
  }

}

TextInput.propTypes = {
  initialInput: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  direction: PropTypes.string
};

export default TextInput;
