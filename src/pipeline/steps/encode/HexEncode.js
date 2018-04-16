import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class HexEncodeForm extends Component {

  constructor(props) {
    super(props);
    this.onEncodingChange = this.onEncodingChange.bind(this);
    this.onSeparatorChange = this.onSeparatorChange.bind(this);
    this.onPrefixChange = this.onPrefixChange.bind(this);
    this.onSuffixChange = this.onSuffixChange.bind(this);
    this.onCaseChange = this.onCaseChange.bind(this);
    this.onBytesPerLineChange = this.onBytesPerLineChange.bind(this);
  }

  render() {
    var encoding = null;
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
    return (
      <form className="form-inline row">
        <div className="help col-xs-12">
          Select hex options. See HTML Encode and URI Encode for specialized hex encoding.
        </div>
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
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Case</label>
          <select onChange={this.onCaseChange} value={this.props.step.hexcase}>
            <option value="lower">lower</option>
            <option value="upper">UPPER</option>
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

  onSeparatorChange(e) {
    this.props.step.setSeparator(e.target.value);
    this.props.refresh();
  }

  onPrefixChange(e) {
    this.props.step.setPrefix(e.target.value);
    this.props.refresh();
  }

  onSuffixChange(e) {
    this.props.step.setSuffix(e.target.value);
    this.props.refresh();
  }

  onCaseChange(e) {
    this.props.step.setCase(e.target.value);
    this.props.refresh();
  }

  onBytesPerLineChange(e) {
    this.props.step.setBytesPerLine(e.target.value);
    this.props.refresh();
  }

}

class HexEncode extends Step {

  static title = 'Hex Encode';
  static supports = [ StringType, ByteStringBufferType ];

  form = HexEncodeForm;
  showEncoding = false;

  encoding = Globals.ENCODING;
  bytesPerLine = '';
  separator = '';
  prefix = '';
  suffix = '';
  hexcase = 'lower';

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
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

  setCase(hexcase) {
    this.output = null;
    this.hexcase = hexcase;
    this.passInput();
  }

  setBytesPerLine(bytesPerLine) {
    this.output = null;
    this.bytesPerLine = bytesPerLine;
    this.passInput();
  }

  calculate(input) {
    var result = '';
    if (input.type === StringType) {
      this.showEncoding = true;
      switch (this.encoding) {
      case 'UTF-8':
        result = util.bytesToHex(util.encodeUtf8(input.data));
        break;
      case 'UTF-16':
        result = this.encodeUtf16BE(input.data);
        break;
      case 'UTF-16LE':
        result = this.encodeUtf16LE(input.data);
        break;
      case 'ISO-8859-1':
      default:
        for (let i = 0; i < input.data.length; i++) {
          if (input.data.charCodeAt(i) > 255) {
            return Data.invalid('Input contains multi-byte characters and cannot be encoded as ISO-8859-1');
          }
        }
        result = util.bytesToHex(input.data);
        break;
      }

    } else {
      this.showEncoding = false;
      result = input.data.toHex();
    }
    if (this.hexcase === 'upper') {
      result = result.toUpperCase();
    }
    var bytesPerLine = 0;
    try {
      bytesPerLine = parseInt(this.bytesPerLine, 10);
    } catch (e) {
      // TODO add error class to the field
    }
    if (this.separator || this.prefix || this.suffix || this.bytesPerLine) {
      const pairs = result.match(/.{2}/g);
      for (var i = 0; i < pairs.length; i++) {
        var terminator = '';
        if (i < pairs.length - 1) {
          if (bytesPerLine && (i + 1) % bytesPerLine === 0) {
            terminator = '\n';
          } else {
            terminator = this.separator;
          }
        }
        pairs[i] = this.prefix + pairs[i] + this.suffix + terminator;
      }
      result = pairs.join('');
    }
    return Data.string(result);
  }

  encodeUtf16BE(data) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += ('000' + data.charCodeAt(i).toString(16)).slice(-4);
    }
    return result;
  }

  encodeUtf16LE(data) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
      const hex = ('000' + data.charCodeAt(i).toString(16)).slice(-4);
      result += hex.substring(2) + hex.substring(0, 2);
    }
    return result;
  }

}

HexEncodeForm.propTypes = {
  step: PropTypes.instanceOf(HexEncode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {HexEncodeForm};
export default HexEncode;
