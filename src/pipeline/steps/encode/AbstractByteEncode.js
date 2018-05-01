import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';
import Globals from '../../../Globals';
import ByteUtils, {OutOfRangeError} from '../../../lib/ByteUtils';
import StringUtils from '../../../lib/StringUtils';

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
    const encoding = step.showEncoding ? (
      <div className="material-group col-xs-4 col-sm-3 col-md-2">
        <label>Encoding</label>
        <select onChange={this.settingHandler(step.setEncoding)} value={prefs.encoding}>
          <option value="UTF-8">UTF-8</option>
          <option value="UTF-16BE">UTF-16 big-endian</option>
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
        {kase}
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

class AbstractByteEncode extends Step {

  static variantTitle = 'Encode';
  static supports = [ StringType, ByteStringBufferType ];
  static form = ByteEncodeForm;

  base = 'bin';
  showCase = false;
  showEncoding = false;

  prefs = {
    encoding: 'UTF-8',
    bom: '0',
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

  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };
  setBom = (v) => { this.prefs.bom = v; this._update(); };
  setSeparator = (v) => { this.prefs.separator = v; this._update(); };
  setPrefix = (v) => { this.prefs.prefix = v; this._update(); };
  setSuffix = (v) => { this.prefs.suffix = v; this._update(); };
  setCase = (v) => { this.prefs.case = v; this._update(); };
  setBytesPerLine = (v) => { this.prefs.bytesPerLine = v; this._update(); };

  calculate(input) {
    let opts = Object.assign({}, this.prefs);
    opts.bom = this.prefs.bom === '1';
    opts.bytesPerLine = parseInt(this.prefs.bytesPerLine, 10);
    if (input.type === StringType) {
      this.showEncoding = true;
      try {
        return Data.string(StringUtils.jsStringToBaseString(input.data, this.base, opts));
      } catch (e) {
        if (e instanceof OutOfRangeError && this.prefs.encoding === 'ISO-8859-1') {
          return Data.invalid('Input contains multi-byte characters and cannot be encoded as ISO-8859-1');
        } else {
          throw e;
        }
      }
    } else {
      this.showEncoding = false;
      return Data.string(ByteUtils.byteStringBufferToBaseString(input.data.copy(), this.base, opts));
    }
  }

}

ByteEncodeForm.propTypes = {
  step: PropTypes.instanceOf(AbstractByteEncode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {ByteEncodeForm};
export default AbstractByteEncode;
