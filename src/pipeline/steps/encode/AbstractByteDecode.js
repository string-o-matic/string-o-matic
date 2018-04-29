import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class ByteDecodeForm extends Component {

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

class AbstractByteDecode extends Step {

  static supports = [ StringType ];
  static rtl = true;
  static form = ByteDecodeForm;

  base = 16;

  prefs = {
    encoding: 'UTF-8'
  };

  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  _config = {
    2: {
      chars: 8,
      disallowed: /[^01 ]/g,
      prefix: /0b/g,
      leBom: '11111111 11111110',
      beBom: '11111110 11111111'
    },
    10: {
      disallowed: /[^0-9 ]/g,
      leBom: '255 254',
      beBom: '254 255'
    },
    16: {
      chars: 2,
      disallowed: /[^0-9a-f ]/g,
      prefix: /0x/g,
      leBom: 'FF FE',
      beBom: 'FE FF'
    }
  };

  calculate(input) {
    const config = this._config[this.base];
    let data = input.data.toLowerCase();
    if (config.prefix) {
      data = data.replace(config.prefix, ' ');
    }
    if (config.disallowed) {
      data = data.replace(config.disallowed, ' ');
    }
    switch (this.prefs.encoding) {
    case 'UTF-8':
      try {
        return Data.string(util.decodeUtf8(this.decodeFixedBytes(data, 1).data));
      } catch (e) {
        return Data.invalid('Input cannot be decoded as UTF-8 - try another character encoding.');
      }
    case 'UTF-16':
      return this.decodeFixedBytes(data, 2, 'big');
    case 'UTF-16LE':
      return this.decodeFixedBytes(data, 2, 'little');
    case 'UTF-16AUTO':
      return this.decodeFixedBytes(data, 2, 'auto');
    case 'ISO-8859-1':
    default:
      return this.decodeFixedBytes(data, 1);
    }
  }

  decodeFixedBytes(data, width, endian) {
    let info = null;
    const conf = this._config[this.base];
    const splitter = conf.chars ? new RegExp('.{1,' + conf.chars + '}', 'g') : null;
    const bytes = data
      .split(' ')
      .filter((e) => e.length > 0)
      .reduce((r, e) => {
        if (splitter && e.length > conf.chars) {
          r.push(...e.match(splitter));
        } else {
          r.push(e);
        }
        return r;
      }, [])
      .map((e) => parseInt(e, this.base)) || [];

    let start = 0;
    if (width === 2 && bytes.length >= 2) {
      const bom = (bytes[0] << 8) + bytes[1];
      if (endian === 'auto') {
        if (bom === 0xFFFE) {
          start = 2;
          endian = 'little';
          info = 'Found little-endian byte order mark';
        } else if (bom === 0xFEFF) {
          start = 2;
          endian = 'big';
          info = 'Found big-endian byte order mark';
        } else {
          endian = 'big';
          info = 'No byte order mark - assuming big-endian';
        }
      } else if (bom === 0xFFFE) {
        start = 2;
        info = 'Stripped little-endian byte order mark (' + conf.leBom + ')';
      } else if (bom === 0xFEFF) {
        start = 2;
        info = 'Stripped big-endian byte order mark (' + conf.beBom + ')';
      }
    }

    let string = '';
    for (let i = start; i < bytes.length - (width - 1); i += width) {
      let b = bytes[i];
      if (width === 2) {
        let b2 = bytes[i + 1];
        if (endian === 'little') {
          b = (b2 << 8) + b;
        } else {
          b = (b << 8) + b2;
        }
      }
      string += String.fromCharCode(b);
    }
    const result = Data.string(string);
    if (info) {
      result.addInfo(info);
    }
    return result;
  }

}

ByteDecodeForm.propTypes = {
  step: PropTypes.instanceOf(AbstractByteDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {ByteDecodeForm};
export default AbstractByteDecode;
