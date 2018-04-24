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

    return (
      <div>
        <ResizingTextArea onChange={this.onChange} readOnly={false} value={Globals.textInput} direction={this.props.direction}/>
        <div className="meta">
          <div>String, {Globals.textInput.length} characters</div>
          {warning}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.inputChange(Data.string(Globals.textInput + ''));
  }

  onChange(value) {
    this.props.inputChange(Data.string(value));
    Globals.textInput = value;
    this.setState({ });
  }

  clear() {
    Globals.textInput = '';
    this.setState({ });
    this.props.inputChange(Data.string(''));
  }

}

TextInput.propTypes = {
  initialInput: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  direction: PropTypes.string
};

export default TextInput;
