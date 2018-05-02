import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';
import Globals from '../../../Globals';
import ByteUtils from '../../../lib/ByteUtils';

class ByteEncodeForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    const kase = step.showCase ? (
      <div className="material-group col-xs-4 col-sm-3 col-md-2">
        <label>Case</label>
        <select onChange={this.settingHandler(step.setCase)} value={prefs.case}>
          <option value="lower">lower</option>
          <option value="upper">UPPER</option>
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
        {kase}
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

class AbstractByteEncode extends Step {

  static variantTitle = 'Encode';
  static supports = [ StringType, ByteStringBufferType ];
  static input = ByteStringBufferType;
  static output = StringType;
  static form = ByteEncodeForm;

  base = 'bin';
  showCase = false;
  showEncoding = false;

  prefs = {
    source: 'plain',
    encoding: 'UTF-8',
    bom: false,
    bytesPerLine: '',
    separator: ' ',
    prefix: '',
    suffix: '',
    'case': 'lower'
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  setSeparator = (v) => { this.prefs.separator = v; this._update(); };
  setPrefix = (v) => { this.prefs.prefix = v; this._update(); };
  setSuffix = (v) => { this.prefs.suffix = v; this._update(); };
  setCase = (v) => { this.prefs.case = v; this._update(); };
  setBytesPerLine = (v) => { this.prefs.bytesPerLine = v; this._update(); };

  calculate(input) {
    let opts = Object.assign({}, this.prefs);
    opts.bytesPerLine = parseInt(this.prefs.bytesPerLine, 10);
    return Data.string(ByteUtils.byteStringBufferToBaseString(input.data.copy(), this.base, opts));
  }

}

ByteEncodeForm.propTypes = {
  step: PropTypes.instanceOf(AbstractByteEncode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {ByteEncodeForm};
export default AbstractByteEncode;
