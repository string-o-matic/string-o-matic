import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UnicodeDecodeForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    return (
      <form className="form-inline row">
        <div className="material-group col-xs-4 col-sm-3 col-md-2">
          <label>Style</label>
          <select onChange={this.settingHandler(step.setStyle)} value={prefs.style}>
            <option value="hex">Hex</option>
            <option value="dec">Decimal</option>
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

class UnicodeDecode extends Step {

  static title = 'Unicode Decode';
  static variantTitle = 'Decode';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;
  static form = UnicodeDecodeForm;

  showCase = true;

  prefs = {
    style: 'hex'
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  setStyle = (v) => { this.prefs.style = v; this._update(); };

  calculate(input) {
    let base = 16;
    let disallowed = /[^0-9a-fA-F ]/g;
    if (this.prefs.style === 'dec') {
      base = 10;
      disallowed = /[^0-9 ]/g;
    }

    let string = input.data.replace(/([^0-9a-f]|^)0x/gi, '$1').replace(disallowed, ' ');
    console.log(string);
    let characters = string
      .split(' ')
      .filter((e) => e.length > 0)
      .reduce((r, e) => {
        console.log(e);
        r.push(...this.utf16SurrogatePair(parseInt(e, base)));
        return r;
      }, []);
    return Data.string(characters.join(''));
  }

  utf16SurrogatePair(int) {
    if (int > 0xFFFF) {
      const hi = (Math.floor((int - 0x10000) / 0x400) + 0xD800);
      const lo = ((int - 0x10000) % 0x400 + 0xDC00);
      return [String.fromCharCode(hi), String.fromCharCode(lo)];
    } else {
      return [String.fromCharCode(int)];
    }
  }

}

UnicodeDecodeForm.propTypes = {
  step: PropTypes.instanceOf(UnicodeDecode).isRequired,
  refresh: PropTypes.func.isRequired
};

export {UnicodeDecodeForm};
export default UnicodeDecode;
