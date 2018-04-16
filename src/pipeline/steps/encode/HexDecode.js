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
            <option value="UTF-16">UTF-16 big-endian</option>
            <option value="UTF-16LE">UTF-16 little-endian</option>
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
    let data = input.data;
    data = data.toLowerCase();
    data = data.replace(/0x/g, '');
    data = data.replace(/[^a-f0-9]/g, '');
    switch (this.encoding) {
    case 'UTF-8':
      try {
        return Data.string(util.decodeUtf8(util.hexToBytes(data)));
      } catch (e) {
        // TODO make encoding names links that set the encoding
        return Data.invalid('Input cannot be decoded as UTF-8 - try UTF-16 or ISO-8859-1');
      }
    case 'UTF-16':
      return this.decodeFixedWidth(data, 2);
    case 'UTF-16LE':
      return this.decodeFixedWidth(data, 2, true);
    case 'ISO-8859-1':
    default:
      return this.decodeFixedWidth(data, 1);
    }
  }

  decodeFixedWidth(data, width, littleEndian) {
    const pattern = '.{1,' + (width * 2) + '}';
    const regExp = new RegExp(pattern, 'g');
    const hexes = data.match(regExp) || [];
    let string = '';
    for (let i = 0; i < hexes.length; i++) {
      let hex = hexes[i];
      if (hex.length === 4 && littleEndian) {
        hex = hex.substring(2) + hex.substring(0, 2);
      }
      string += String.fromCharCode(parseInt(hex, 16));
    }
    return Data.string(string);
  }

}

HexDecodeForm.propTypes = {
  step: PropTypes.instanceOf(HexDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export default HexDecode;
