import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';
import Globals from '../../../Globals';

class DecimalEncodeForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    const encoding = step.showEncoding ? (
      <div className="material-group col-xs-4 col-sm-3 col-md-2">
        <label>Encoding</label>
        <select onChange={this.settingHandler(step.setEncoding)} value={prefs.encoding}>
          <option value="UTF-8">UTF-8</option>
          <option value="UTF-16">UTF-16 big-endian</option>
          <option value="UTF-16LE">UTF-16 little-endian</option>
          <option value="ISO-8859-1">ISO-8859-1</option>
        </select>
      </div>
    ) : null;
    const bom = step.showEncoding && prefs.encoding.startsWith('UTF-16') ? (
      <div className="material-group col-xs-4 col-sm-3 col-md-2">
        <label>UTF-16 BOM</label>
        <select onChange={this.settingHandler(step.setBom)} value={prefs.bom}>
          <option value="0">Off</option>
          <option value="1">On</option>
        </select>
      </div>
    ) : null;

    return (
      <form className="form-inline row">
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Separator</label>
          <input onChange={this.settingHandler(step.setSeparator)} type="text" maxLength="4" value={prefs.separator} {...Globals.noAutoComplete}/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Prefix</label>
          <input onChange={this.settingHandler(step.setPrefix)} type="text" maxLength="4" value={prefs.prefix} {...Globals.noAutoComplete}/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Suffix</label>
          <input onChange={this.settingHandler(step.setSuffix)} type="text" maxLength="4" value={prefs.suffix} {...Globals.noAutoComplete}/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Bytes per line</label>
          <input onChange={this.settingHandler(step.setBytesPerLine)} type="number" value={prefs.bytesPerLine} {...Globals.noAutoComplete}/>
        </div>
        {encoding}
        {bom}
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

class DecimalEncode extends Step {

  static title = 'Decimal Encode';
  static supports = [ StringType, ByteStringBufferType ];
  static form = DecimalEncodeForm;

  showEncoding = false;

  prefs = {
    encoding: 'UTF-8',
    bom: '0',
    bytesPerLine: '',
    separator: ' ',
    prefix: '',
    suffix: ''
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };
  setBom = (v) => { this.prefs.bom = v; this._update(); };
  setSeparator = (v) => { this.prefs.separator = v; this._update(); };
  setPrefix = (v) => { this.prefs.prefix = v; this._update(); };
  setSuffix = (v) => { this.prefs.suffix = v; this._update(); };
  setBytesPerLine = (v) => { this.prefs.bytesPerLine = v; this._update(); };

  calculate(input) {
    let bytes = [];
    let result = '';
    if (input.type === StringType) {
      this.showEncoding = true;
      switch (this.prefs.encoding) {
      case 'UTF-8':
        bytes = this.encodeRaw(util.encodeUtf8(input.data));
        break;
      case 'UTF-16':
        bytes = this.encodeUtf16(input.data, true, this.prefs.bom === '1');
        break;
      case 'UTF-16LE':
        bytes = this.encodeUtf16(input.data, false, this.prefs.bom === '1');
        break;
      case 'ISO-8859-1':
      default:
        for (let i = 0; i < input.data.length; i++) {
          if (input.data.charCodeAt(i) > 255) {
            return Data.invalid('Input contains multi-byte characters and cannot be encoded as ISO-8859-1');
          }
        }
        bytes = this.encodeRaw(input.data);
        break;
      }
    } else {
      this.showEncoding = false;
      bytes = this.encodeRaw(input.data.copy().getBytes());
    }
    let bytesPerLine = 0;
    try {
      bytesPerLine = parseInt(this.prefs.bytesPerLine, 10);
    } catch (e) {
      // TODO add error class to the field
    }
    if (bytes.length > 0 && (this.prefs.separator || this.prefs.prefix || this.prefs.suffix || this.prefs.bytesPerLine)) {
      for (let i = 0; i < bytes.length; i++) {
        let terminator = '';
        if (i < bytes.length - 1) {
          if (bytesPerLine && (i + 1) % bytesPerLine === 0) {
            terminator = '\n';
          } else {
            terminator = this.prefs.separator;
          }
        }
        bytes[i] = this.prefs.prefix + bytes[i] + this.prefs.suffix + terminator;
      }
    }
    result = bytes.join('');
    return Data.string(result);
  }

  encodeRaw(data) {
    const array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(data.charCodeAt(i));
    }
    return array;
  }

  encodeUtf16(data, bigEndian, bom) {
    const array = [];
    if (bom) {
      this.intToUTF16Bytes(0xfeff, bigEndian, array);
    }
    for (let i = 0; i < data.length; i++) {
      this.intToUTF16Bytes(data.charCodeAt(i), bigEndian, array);
    }
    return array;
  }

  /**
   * @param code {number}
   * @returns {string}
   */
  intToUTF16Bytes(code, bigEndian, array) {
    const b1 = code % 256;
    const b2 = (code - b1)/256;
    if (bigEndian) {
      array.push(b2);
      array.push(b1);
    } else {
      array.push(b1);
      array.push(b2);
    }
  }

}

DecimalEncodeForm.propTypes = {
  step: PropTypes.instanceOf(DecimalEncode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {DecimalEncodeForm};
export default DecimalEncode;
