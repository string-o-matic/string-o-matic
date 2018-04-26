import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class BinaryEncodeForm extends Component {

  render() {
    let encoding = null;
    let bom = null;
    if (this.props.step.showEncoding) {
      encoding = (
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Encoding</label>
          <select onChange={this.onEncodingChange} value={this.props.step.encoding}>
            <option value="UTF-8">UTF-8</option>
            <option value="UTF-16">UTF-16 big-endian</option>
            <option value="UTF-16LE">UTF-16 little-endian</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
          </select>
        </div>
      );
    }
    if (this.props.step.showEncoding && (this.props.step.encoding === 'UTF-16' || this.props.step.encoding === 'UTF-16LE')) {
      bom = (
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>UTF-16 BOM</label>
          <select onChange={this.onBomChange} value={this.props.step.bom}>
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
        </div>
      );
    }
    return (
      <form className="form-inline row">
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Separator</label>
          <input onChange={this.onSeparatorChange} type="text" maxLength="4" value={this.props.step.separator} autoCapitalize="false" autoCorrect="false" autoComplete="false" data-lpignore="true" spellCheck="false"/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Prefix</label>
          <input onChange={this.onPrefixChange} type="text" maxLength="4" value={this.props.step.prefix} autoCapitalize="false" autoCorrect="false" autoComplete="false" data-lpignore="true" spellCheck="false"/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Suffix</label>
          <input onChange={this.onSuffixChange} type="text" maxLength="4" value={this.props.step.suffix} autoCapitalize="false" autoCorrect="false" autoComplete="false" data-lpignore="true" spellCheck="false"/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Bytes per line</label>
          <input onChange={this.onBytesPerLineChange} type="number" value={this.props.step.bytesPerLine} autoCapitalize="false" autoCorrect="false" autoComplete="false" data-lpignore="true" spellCheck="false"/>
        </div>
        {encoding}
        {bom}
      </form>
    );
  }

  onEncodingChange = (e) => {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  };

  onBomChange = (e) => {
    this.props.step.setBom(e.target.value);
    this.props.refresh();
  };

  onSeparatorChange = (e) => {
    this.props.step.setSeparator(e.target.value);
    this.props.refresh();
  };

  onPrefixChange = (e) => {
    this.props.step.setPrefix(e.target.value);
    this.props.refresh();
  };

  onSuffixChange = (e) => {
    this.props.step.setSuffix(e.target.value);
    this.props.refresh();
  };

  onBytesPerLineChange = (e) => {
    this.props.step.setBytesPerLine(e.target.value);
    this.props.refresh();
  };

}

class BinaryEncode extends Step {

  static title = 'Binary Encode';
  static supports = [ StringType, ByteStringBufferType ];

  form = BinaryEncodeForm;
  showEncoding = false;

  encoding = 'UTF-8';
  bom = '0';
  bytesPerLine = '';
  separator = ' ';
  prefix = '';
  suffix = '';

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  setBom(bom) {
    this.output = null;
    this.bom = bom;
    this.passInput();
  }

  setSeparator(separator) {
    this.output = null;
    this.separator = separator;
    this.passInput();
  }

  setPrefix(prefix) {
    this.output = null;
    this.prefix = prefix;
    this.passInput();
  }

  setSuffix(suffix) {
    this.output = null;
    this.suffix = suffix;
    this.passInput();
  }

  setBytesPerLine(bytesPerLine) {
    this.output = null;
    this.bytesPerLine = bytesPerLine;
    this.passInput();
  }

  calculate(input) {
    let result = '';
    if (input.type === StringType) {
      this.showEncoding = true;
      switch (this.encoding) {
      case 'UTF-8':
        result = this.encodeRaw(util.encodeUtf8(input.data));
        break;
      case 'UTF-16':
        result = this.encodeUtf16BE(input.data, this.bom === '1');
        break;
      case 'UTF-16LE':
        result = this.encodeUtf16LE(input.data, this.bom === '1');
        break;
      case 'ISO-8859-1':
      default:
        for (let i = 0; i < input.data.length; i++) {
          if (input.data.charCodeAt(i) > 255) {
            return Data.invalid('Input contains multi-byte characters and cannot be encoded as ISO-8859-1');
          }
        }
        result = this.encodeRaw(input.data);
        break;
      }

    } else {
      this.showEncoding = false;
      result = this.encodeRaw(input.data.copy().getBytes());
    }
    let bytesPerLine = 0;
    try {
      bytesPerLine = parseInt(this.bytesPerLine, 10);
    } catch (e) {
      // TODO add error class to the field
    }
    if (result.length > 0 && (this.separator || this.prefix || this.suffix || this.bytesPerLine)) {
      const bytes = result.match(/.{8}/g);
      for (let i = 0; i < bytes.length; i++) {
        let terminator = '';
        if (i < bytes.length - 1) {
          if (bytesPerLine && (i + 1) % bytesPerLine === 0) {
            terminator = '\n';
          } else {
            terminator = this.separator;
          }
        }
        bytes[i] = this.prefix + bytes[i] + this.suffix + terminator;
      }
      result = bytes.join('');
    }
    return Data.string(result);
  }

  encodeRaw(data) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += this.intToByte(data.charCodeAt(i));
    }
    return result;
  }

  encodeUtf16BE(data, bom) {
    let result = bom ? this.intToUTF16Bytes(0xfeff) : '';
    for (let i = 0; i < data.length; i++) {
      result += this.intToUTF16Bytes(data.charCodeAt(i));
    }
    return result;
  }

  encodeUtf16LE(data, bom) {
    let result = bom ? this.intToUTF16Bytes(0xfffe) : '';
    for (let i = 0; i < data.length; i++) {
      const bin = this.intToUTF16Bytes(data.charCodeAt(i));
      result += bin.substring(8) + bin.substring(0, 8);
    }
    return result;
  }

  /**
   * @param code {number}
   * @returns {string}
   */
  intToByte(code) {
    return ('00000000' + code.toString(2)).slice(-8);
  }

  /**
   * @param code {number}
   * @returns {string}
   */
  intToUTF16Bytes(code) {
    return ('0000000000000000' + code.toString(2)).slice(-16);
  }

}

BinaryEncodeForm.propTypes = {
  step: PropTypes.instanceOf(BinaryEncode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {BinaryEncodeForm};
export default BinaryEncode;
