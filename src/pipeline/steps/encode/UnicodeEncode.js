import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Globals from '../../../Globals';

class UnicodeEncodeForm extends Component {

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
          <label>Style</label>
          <select onChange={this.settingHandler(step.setStyle)} value={prefs.style}>
            <option value="hex-padded">Hex, padded</option>
            <option value="hex-unpadded">Hex, unpadded</option>
            <option value="dec">Decimal</option>
          </select>
        </div>
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
          <label>Chars per line</label>
          <input onChange={this.settingHandler(step.setCharsPerLine)} type="number" value={prefs.charsPerLine} {...Globals.noAutoComplete}/>
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

class UnicodeEncode extends Step {

  static title = 'Unicode Encode';
  static variantTitle = 'Encode';
  static supports = [ StringType ];
  static output = StringType;
  static form = UnicodeEncodeForm;

  showCase = true;

  prefs = {
    style: 'hex-padded',
    charsPerLine: '',
    separator: ' ',
    prefix: 'U+',
    suffix: '',
    case: 'upper'
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  setStyle = (v) => { this.prefs.style = v; this._update(); };
  setSeparator = (v) => { this.prefs.separator = v; this._update(); };
  setPrefix = (v) => { this.prefs.prefix = v; this._update(); };
  setSuffix = (v) => { this.prefs.suffix = v; this._update(); };
  setCharsPerLine = (v) => { this.prefs.charsPerLine = v; this._update(); };
  setCase = (v) => { this.prefs.case = v; this._update(); };

  calculate(input) {
    this.showCase = this.prefs.style !== 'dec';

    let data = input.data;
    let intArray = [];
    for (let i = 0; i < data.length; i++) {
      const int = data.charCodeAt(i);

      if (int >= 0xD800 && int <= 0xDBFF && i < data.length - 1) {
        // Surrogate high byte. Combine this and the next.
        // NOTE No check if the second byte is in the low surrogate range 0xDC00 to 0xDFFF.
        const hi = int;
        const lo = data.charCodeAt(i + 1);
        const pair = (hi - 0xD800) * 0x400 + lo - 0xDC00 + 0x10000;
        intArray.push(pair);
        i += 1;
      } else  {
        intArray.push(int);
      }
    }

    let charsPerLine = parseInt(this.prefs.charsPerLine, 10) || 0;
    let strArray = new Array(intArray.length);
    if (intArray.length > 0) {
      for (let i = 0; i < intArray.length; i++) {
        let terminator = '';
        if (i < intArray.length - 1) {
          if (charsPerLine && (i + 1) % charsPerLine === 0) {
            terminator = '\n';
          } else {
            terminator = this.prefs.separator;
          }
        }
        let str = intArray[i].toString(this.prefs.style === 'dec' ? 10 : 16);
        if (str.length < 4 && this.prefs.style === 'hex-padded') {
          str = ('0'.repeat(3) + str).slice(-4);
        }
        if (this.prefs.case === 'upper') {
          str = str.toUpperCase();
        }
        strArray[i] = this.prefs.prefix + str + this.prefs.suffix + terminator;
      }
    }
    return Data.string(strArray.join(''));
  }

}

UnicodeEncodeForm.propTypes = {
  step: PropTypes.instanceOf(UnicodeEncode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {UnicodeEncodeForm};
export default UnicodeEncode;
