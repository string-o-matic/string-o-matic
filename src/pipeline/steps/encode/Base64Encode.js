import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class Base64EncodeForm extends Component {

  constructor(props) {
    super(props);
    this.onEncodingChange = this.onEncodingChange.bind(this);
    this.onLineLengthChange = this.onLineLengthChange.bind(this);
  }

  render() {
    var encoding = null;
    if (this.props.step.showEncoding) {
      encoding = (
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encoding</label>
          <select onChange={this.onEncodingChange} value={this.props.step.encoding}>
            <option value="UTF-8">UTF-8</option>
            <option value="UTF-16">UTF-16</option>
          </select>
        </div>
      );
    }
    return (
      <form className="form-inline row">
        <div className="help col-xs-12">
          Select base64 options.
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Line length</label>
          <input onChange={this.onLineLengthChange} type="number" value={this.props.step.onLineLengthChange} autoCapitalize="false" autoCorrect="false" autoComplete="false" data-lpignore="true" spellCheck="false"/>
        </div>
        {encoding}
      </form>
    );
  }

  onEncodingChange(e) {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  }

  onLineLengthChange(e) {
    this.props.step.setLineLength(e.target.value);
    this.props.refresh();
  }

}

class Base64Encode extends Step {

  static title = 'Base64 Encode';
  static supports = [ StringType ];

  form = Base64EncodeForm;
  showEncoding = false;

  encoding = Globals.ENCODING;
  lineLength = '';

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  setLineLength(lineLength) {
    this.output = null;
    this.lineLength = lineLength;
    this.passInput();
  }

  calculate(input) {
    var lineLength = 0;
    try {
      lineLength = parseInt(this.lineLength, 10);
    } catch (e) {
      // TODO add error class to the field
    }
    var result = util.encode64(util.encodeUtf8(input.data));
    if (lineLength > 0) {
      var pattern = '.{1,' + lineLength + '}';
      var regExp = new RegExp(pattern, 'g');
      var lines = result.match(regExp) || [];
      result = lines.join('\n');
    }
    return Data.string(result);
  }

}

Base64EncodeForm.propTypes = {
  step: PropTypes.instanceOf(Base64Encode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {Base64EncodeForm};
export default Base64Encode;
