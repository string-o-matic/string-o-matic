import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

// TODO Show some information about auto padding and decoding of URL safe
class Base64DecodeForm extends Component {

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

class Base64Decode extends Step {

  static title = 'Base64 Decode';
  static supports = [ StringType ];

  form = Base64DecodeForm;

  encoding = Globals.ENCODING;

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  calculate(input) {
    // Remove newlines and convert from URL safe to standard, then pad to multiple of 4
    let data = input.data.replace(/[^A-Za-z0-9+/=\-_]/g, '').replace(/-/g, '+').replace(/_/g, '/');
    while (data.length % 4 !== 0) {
      data += '=';
    }
    switch (this.encoding) {
    case 'UTF-8':
      try {
        return Data.string(util.decodeUtf8(util.decode64(data)));
      } catch (e) {
        // TODO make encoding names links that set the encoding
        return Data.invalid('Input cannot be decoded as UTF-8 - try UTF-16 or ISO-8859-1');
      }
    case 'UTF-16': {
      const uint8Array = util.binary.raw.decode(util.decode64(data));
      return this.uint8ArrayToUtf16(uint8Array, 'big');
    }
    case 'UTF-16LE': {
      const uint8Array = util.binary.raw.decode(util.decode64(data));
      return this.uint8ArrayToUtf16(uint8Array, 'little');
    }
    case 'UTF-16AUTO': {
      const uint8Array = util.binary.raw.decode(util.decode64(data));
      return this.uint8ArrayToUtf16(uint8Array, 'auto');
    }
    case 'ISO-8859-1':
    default:
      return Data.string(util.decode64(data));
    }
  }

  uint8ArrayToUtf16(uint8Array, endian) {
    let start = 0;
    let info = '';
    if (endian === 'auto') {
      if (uint8Array[0] === 255 && uint8Array[1] === 254) {
        start = 2;
        endian = 'little';
        info = 'Found little-endian byte order mark';
      } else if (uint8Array[0] === 254 && uint8Array[1] === 255) {
        start = 2;
        endian = 'big';
        info = 'Found big-endian byte order mark';
      } else {
        endian = 'big';
        info = 'No byte order mark - assuming big-endian';
      }
    } else if (uint8Array[0] === 255 && uint8Array[1] === 254) {
      start = 2;
      info = 'Stripped little-endian byte order mark (0xFF 0xFE)';
    } else if (uint8Array[0] === 254 && uint8Array[1] === 255) {
      start = 2;
      info = 'Stripped big-endian byte order mark (0xFE 0xFF)';
    }
    let string = '';
    for (let i = start; i < uint8Array.length; i += 2) {
      const charCode = endian === 'little' ? (uint8Array[i + 1] * 256) + uint8Array[i] : (uint8Array[i] * 256) + uint8Array[i + 1];
      string += String.fromCharCode(charCode);
    }
    const result = Data.string(string);
    if (info) {
      result.addInfo(info);
    }
    return result;
  }

}

Base64DecodeForm.propTypes = {
  step: PropTypes.instanceOf(Base64Decode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {Base64DecodeForm};
export default Base64Decode;
