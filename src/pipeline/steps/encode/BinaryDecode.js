import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class BinaryDecodeForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    return (
      <form className="form-inline row">
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encoding</label>
          <select onChange={this.settingHandler(step.setEncoding)} value={prefs.encoding}>
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

  settingHandler = (settingFunc) => {
    return (e) => {
      settingFunc(e.target.value);
      this.props.refresh();
    };
  };

}

class BinaryDecode extends Step {

  static title = 'Binary Decode';
  static supports = [ StringType ];
  static rtl = true;
  static form = BinaryDecodeForm;

  direction = 'ltr';

  prefs = {
    encoding: 'UTF-8'
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };

  calculate(input) {
    let data = input.data;
    data = data.toLowerCase();
    data = data.replace(/0b/g, '');
    data = data.replace(/[^01]/g, '');
    switch (this.prefs.encoding) {
    case 'UTF-8':
      try {
        return Data.string(util.decodeUtf8(this.decodeFixedWidth(data, 1).data));
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
        if (data.startsWith('1111111111111110')) {
          data = data.substring(16);
          endian = 'little';
          info = 'Found little-endian byte order mark';
        } else if (data.startsWith('1111111011111111')) {
          data = data.substring(16);
          endian = 'big';
          info = 'Found big-endian byte order mark';
        } else {
          endian = 'big';
          info = 'No byte order mark - assuming big-endian';
        }
      } else if (data.startsWith('1111111111111110')) {
        data = data.substring(16);
        info = 'Stripped little-endian byte order mark (0xFF 0xFE)';
      } else if (data.startsWith('1111111011111111')) {
        data = data.substring(16);
        info = 'Stripped big-endian byte order mark (0xFE 0xFF)';
      }
    }
    const pattern = '.{1,' + (width * 8) + '}';
    const regExp = new RegExp(pattern, 'g');
    const bytes = data.match(regExp) || [];
    let string = '';
    for (let i = 0; i < bytes.length; i++) {
      let byte = bytes[i];
      if (byte.length === 16 && endian === 'little') {
        byte = byte.substring(8) + byte.substring(0, 8);
      }
      string += String.fromCharCode(parseInt(byte, 2));
    }
    const result = Data.string(string);
    if (info) {
      result.addInfo(info);
    }
    return result;
  }

}

BinaryDecodeForm.propTypes = {
  step: PropTypes.instanceOf(BinaryDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export default BinaryDecode;
