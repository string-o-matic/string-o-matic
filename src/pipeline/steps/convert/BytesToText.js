import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StringUtils, {ConversionError} from '../../../lib/StringUtils';
import {ByteStringBufferType, StringType} from '../../Types';
import Step from '../Step';
import Data from '../../Data';

class BytesToTextForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    return (
      <div className="row">
        <div className="material-group col-xs-9 col-sm-3 col-md-3">
          <label>Char Encoding</label>
          <div className="btn-group">
            <select onChange={this.settingHandler(step.setEncoding)} value={prefs.encoding}>
              <option value="UTF-8">UTF-8</option>
              <option value="UTF-16BE">UTF-16 big-endian</option>
              <option value="UTF-16LE">UTF-16 little-endian</option>
              <option value="ISO-8859-1">ISO-8859-1</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  settingHandler = (settingFunc) => {
    return (e) => {
      settingFunc(e.target.value);
      this.props.refresh();
    };
  };

}

class BytesToText extends Step {

  static title = 'Bytes \u2192 Text';
  static supports = [ ByteStringBufferType ];
  static output = StringType;
  static form = BytesToTextForm;

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
      const jsString = StringUtils.byteStringBufferToJsString(input.data, this.prefs.encoding);
      const result = Data.string(jsString.string);
      if (jsString.info) {
        result.addInfo(jsString.info);
      }
      return result;
    } catch (e) {
      // TODO is OutOfRangeError possible?
      if (e instanceof ConversionError) {
        return Data.invalid(e.message);
      } else {
        throw e;
      }
    }
  }

}

BytesToTextForm.propTypes = {
  step: PropTypes.instanceOf(BytesToText).isRequired,
  refresh: PropTypes.func.isRequired
};

export default BytesToText;