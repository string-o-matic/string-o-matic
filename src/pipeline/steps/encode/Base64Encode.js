import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';
import Globals from '../../../Globals';
import ByteUtils, {OutOfRangeError} from '../../../lib/ByteUtils';

class Base64EncodeForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    return (
      <form className="form-inline row">
        <div className={'material-group col-xs-4 col-sm-3 col-md-2' + (step.lineValid ? '' : ' has-error')}>
          <label>Line length</label>
          <input onChange={this.settingHandler(step.setLine)} type="number" value={this.props.step.line} {...Globals.noAutoComplete}/>
        </div>
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Variant</label>
          <select onChange={this.settingHandler(step.setVariant)} value={prefs.variant}>
            <option value="standard">Standard</option>
            <option value="urlsafe">URL Safe</option>
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

class Base64Encode extends Step {

  static title = 'Base64 Encode';
  static variantTitle = 'Encode';
  static supports = [ StringType, ByteStringBufferType ];
  static input = ByteStringBufferType;
  static output = StringType;
  static form = Base64EncodeForm;

  base = 'b64';
  lineValid = true;

  prefs = {
    source: 'plain',
    encoding: 'UTF-8',
    bom: false,
    variant: 'standard',
    line: ''
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  setVariant = (v) => { this.prefs.variant = v; this._update(); };
  setLine = (v) => { this.prefs.line = v; this._update(); };

  calculate(input) {
    let opts = Object.assign({}, this.prefs);
    opts.line = null;
    this.lineValid = true;
    if (typeof this.prefs.line === 'number' || this.prefs.line.length > 0) {
      let line = typeof this.prefs.line === 'number' ? this.prefs.line : parseInt(this.prefs.line, 10);
      if (isNaN(line) || line < 1) {
        this.lineValid = false;
      } else {
        opts.line = line;
      }
    }

    try {
      return Data.string(ByteUtils.byteStringBufferToBaseString(input.data.copy(), this.base, opts));
    } catch (e) {
      if (e instanceof OutOfRangeError) {
        return Data.invalid('Input contains multi-byte characters and cannot be encoded as ISO-8859-1');
      } else {
        throw e;
      }
    }
  }

}

Base64EncodeForm.propTypes = {
  step: PropTypes.instanceOf(Base64Encode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {Base64EncodeForm};
export default Base64Encode;
