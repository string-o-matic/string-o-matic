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
    this.onVariantChange = this.onVariantChange.bind(this);
    this.onLineLengthChange = this.onLineLengthChange.bind(this);
  }

  render() {
    let encoding = null;
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
          <input onChange={this.onLineLengthChange} type="number" value={this.props.step.lineLength} autoCapitalize="false" autoCorrect="false" autoComplete="false" data-lpignore="true" spellCheck="false"/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Variant</label>
          <select onChange={this.onVariantChange} value={this.props.step.variant}>
            <option value="standard">Standard</option>
            <option value="urlsafe">URL Safe</option>
          </select>
        </div>
        {encoding}
      </form>
    );
  }

  onEncodingChange(e) {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  }

  onVariantChange(e) {
    this.props.step.setVariant(e.target.value);
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
  showEncoding = true;

  encoding = Globals.ENCODING;
  variant = 'standard';
  lineLength = '';

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  setVariant(variant) {
    this.output = null;
    this.variant = variant;
    this.passInput();
  }

  setLineLength(lineLength) {
    this.output = null;
    this.lineLength = lineLength;
    this.passInput();
  }

  calculate(input) {
    let lineLength = 0;
    try {
      lineLength = parseInt(this.lineLength, 10);
    } catch (e) {
      // TODO add error class to the field
    }
    let result = '';
    switch (this.encoding) {
    case 'UTF-8':
      result = util.encode64(this.stringToUtf8BinaryString(input.data));
      break;
    case 'UTF-16':
    default:
      result = util.encode64(this.stringToUtf16BEBinaryString(input.data));
      break;
    }
    if (this.variant === 'urlsafe') {
      result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    if (lineLength > 0) {
      const pattern = '.{1,' + lineLength + '}';
      const regExp = new RegExp(pattern, 'g');
      const lines = result.match(regExp) || [];
      result = lines.join('\r\n');
    }
    return Data.string(result);
  }

  stringToUtf8BinaryString(string) {
    return util.encodeUtf8(string);
  }

  stringToUtf16BEBinaryString(string) {
    const buffer = new Uint8Array(string.length * 2);
    const view = new DataView(buffer.buffer);
    for (let i = 0; i < string.length; i++) {
      view.setUint16(i * 2, string.charCodeAt(i));
    }
    return util.binary.raw.encode(buffer);
  }

}

Base64EncodeForm.propTypes = {
  step: PropTypes.instanceOf(Base64Encode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {Base64EncodeForm};
export default Base64Encode;
