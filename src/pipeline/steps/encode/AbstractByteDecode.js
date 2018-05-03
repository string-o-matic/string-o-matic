import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import ByteUtils, {OutOfRangeError} from '../../../lib/ByteUtils';
import StringUtils, {ConversionError} from '../../../lib/StringUtils';

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
            <option value="UTF-16BE">UTF-16 big-endian</option>
            <option value="UTF-16LE">UTF-16 little-endian</option>
            <option value="UTF-16">UTF-16 auto</option>
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

  static variantTitle = 'Decode';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;
  static form = ByteDecodeForm;

  base = 'hex';

  prefs = {
    encoding: 'UTF-8'
  };

  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    try {
      const uint8Array = ByteUtils.baseStringToUint8Array(input.data, this.base);
      const jsString = StringUtils.uint8ArrayToJsString(uint8Array, this.prefs.encoding);
      const result = Data.string(jsString.string);
      if (jsString.info) {
        result.addInfo(jsString.info);
      }
      return result;
    } catch (e) {
      // TODO is OutOfRangeError possible?
      if (e instanceof OutOfRangeError && this.base === 'dec') {
        return Data.invalid('Input contained a number outside the range 0-255 and cannot be decoded as decimal.');
      } else if (e instanceof ConversionError) {
        return Data.invalid(e.message);
      } else {
        throw e;
      }
    }
  }

}

ByteDecodeForm.propTypes = {
  step: PropTypes.instanceOf(AbstractByteDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {ByteDecodeForm};
export default AbstractByteDecode;
