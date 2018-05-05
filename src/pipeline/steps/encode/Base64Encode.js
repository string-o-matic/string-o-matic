import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globals from '../../../Globals';
import AbstractByteEncode from './AbstractByteEncode';

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

class Base64Encode extends AbstractByteEncode {

  static title = 'Base64 Encode';
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

}

Base64EncodeForm.propTypes = {
  step: PropTypes.instanceOf(Base64Encode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {Base64EncodeForm};
export default Base64Encode;
