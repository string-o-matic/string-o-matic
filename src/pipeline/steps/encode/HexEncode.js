import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class HexEncodeForm extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <form className="form-inline row">
        <div className="form-group col-xs-12 col-sm-4 col-md-3">
          <div className="input-group">
            <div className="input-group-addon">Encoding</div>
            <select onChange={this.onChange} className="form-control" value={this.props.step.encoding}>
              <option value="UTF-8">UTF-8</option>
              <option value="UTF-16">UTF-16</option>
            </select>
          </div>
        </div>
      </form>
    );
  }

  onChange(e) {
    this.props.step.setEncoding(e.target.value);
    this.props.refresh();
  }

}

class HexEncode extends Step {

  static title = 'Hex Encode';
  static supports = [ StringType, ByteStringBufferType ];

  form = HexEncodeForm;
  encoding = Globals.ENCODING;

  setEncoding(encoding) {
    this.output = null;
    this.encoding = encoding;
    this.passInput();
  }

  calculate(input) {
    if (input.type === StringType) {
      this.form = HexEncodeForm;
      var result = '';
      switch (this.encoding) {
        case 'UTF-16':
          result = this.encodeUtf16(input.data);
          break;
        default:
          result = util.bytesToHex(util.encodeUtf8(input.data));
          break;
      }
      return Data.string(result);
    } else {
      this.form = null;
      return Data.string(input.data.toHex());
    }
  }

  encodeUtf16(data) {
    var result = '';
    for (var i = 0; i < data.length; i++) {
      var hex = data.charCodeAt(i).toString(16);
      result += ('000' + hex).slice(-4);
    }
    return result
  }

}

export {HexEncodeForm};
export default HexEncode;
