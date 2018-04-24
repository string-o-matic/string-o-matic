import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encoding</label>
          <select onChange={this.onEncodingChange} value={this.props.step.encoding}>
            <option value="UTF-8">UTF-8</option>
            <option value="UTF-16">UTF-16 big-endian</option>
            <option value="UTF-16LE">UTF-16 little-endian</option>
            <option value="UTF-16AUTO">UTF-16 auto</option>
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
  static rtl = true;

  form = HexDecodeForm;

  encoding = 'UTF-8';

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
      return this.decodeFixedWidth(data, 2, 'big');
    case 'UTF-16LE':
      return this.decodeFixedWidth(data, 2, 'little');
    case 'UTF-16AUTO':
      return this.decodeFixedWidth(data, 2, 'auto');
    case 'ISO-8859-1':
    default:
      return this.decodeFixedWidth(data, 1);
    }
  }

  decodeFixedWidth(data, width, endian) {
    let info = null;
    if (width === 2) {
      if (endian === 'auto') {
        if (data.startsWith('fffe')) {
          data = data.substring(4);
          endian = 'little';
          info = 'Found little-endian byte order mark';
        } else if (data.startsWith('feff')) {
          data = data.substring(4);
          endian = 'big';
          info = 'Found big-endian byte order mark';
        } else {
          endian = 'big';
          info = 'No byte order mark - assuming big-endian';
        }
      } else if (data.startsWith('fffe')) {
        data = data.substring(4);
        info = 'Stripped little-endian byte order mark (0xFF 0xFE)';
      } else if (data.startsWith('feff')) {
        data = data.substring(4);
        info = 'Stripped big-endian byte order mark (0xFE 0xFF)';
      }
    }
    const pattern = '.{1,' + (width * 2) + '}';
    const regExp = new RegExp(pattern, 'g');
    const hexes = data.match(regExp) || [];
    let string = '';
    for (let i = 0; i < hexes.length; i++) {
      let hex = hexes[i];
      if (hex.length === 4 && endian === 'little') {
        hex = hex.substring(2) + hex.substring(0, 2);
      }
      string += String.fromCharCode(parseInt(hex, 16));
    }
    const result = Data.string(string);
    if (info) {
      result.addInfo(info);
    }
    return result;
  }

}

HexDecodeForm.propTypes = {
  step: PropTypes.instanceOf(HexDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export default HexDecode;
