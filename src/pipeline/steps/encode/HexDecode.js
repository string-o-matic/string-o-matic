import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class HexDecodeForm extends Component {

  constructor(props) {
    super(props);
    this.onEncodingChange = this.onEncodingChange.bind(this);
  }

  render() {
    return (
      <form className="form-inline row">
        <div className="help col-xs-12">
          Select decoding options. See HTML Decode and URI Decode for specialized hex decoding.
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encoding</label>
          <select onChange={this.onEncodingChange} value={this.props.step.encoding}>
            <option value="UTF-8">UTF-8</option>
            <option value="UTF-16">UTF-16</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
          </select>
        </div>
      </form>
    );
  }

  onEncodingChange(e) {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  }

}

class HexDecode extends Step {

  static title = 'Hex Decode';
  static supports = [ StringType ];

  form = HexDecodeForm;

  encoding = Globals.ENCODING;

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  calculate(input) {
    // FIXME decoding an MD5 sum causes an exception. Fix or catch.
    switch (this.encoding) {
    case 'UTF-8':
      try {
        return Data.string(util.decodeUtf8(util.hexToBytes(input.data)));
      } catch (e) {
        // TODO make encoding names links that set the encoding
        return Data.invalid('Input cannot be decoded as UTF-8. Try UTF-16 or ISO-8859-1.');
      }
    case 'UTF-16':
      return this.decodeFixedWidth(input.data, 2);
    case 'ISO-8859-1':
    default:
      return this.decodeFixedWidth(input.data, 1);
    }
  }

  decodeFixedWidth(data, width) {
    var warning = false;
    var pattern = '.{1,' + (width * 2) + '}';
    var regExp = new RegExp(pattern, 'g');
    var hexes = data.match(regExp) || [];
    var string = '';
    for (var i = 0; i < hexes.length; i++) {
      const int = parseInt(hexes[i], 16);
      if (int === 9 || int === 10 || int === 13 || (int >= 32 && int <= 126) || (int >= 160 && int <= 172) || int >= 174) {
        string += String.fromCharCode(parseInt(hexes[i], 16));
      } else {
        warning = true;
        string += '\ufffd';
      }
    }
    const result = Data.string(string);
    if (warning) {
      result.addWarning('Some characters are not printable and are displayed as \ufffd.');
    }
    return result;
  }

}

HexDecodeForm.propTypes = {
  step: PropTypes.instanceOf(HexDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export default HexDecode;
