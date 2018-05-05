import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ByteUtils, {OutOfRangeError} from '../../../lib/ByteUtils';
import StringUtils, {ConversionError} from '../../../lib/StringUtils';
import Step from '../Step';
import Data from '../../Data';
import {ByteArrayType, StringType} from '../../Types';

class TextToBytesForm extends Component {

  // TODO Alerts or grey out the options which don't match the input
  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    const sources = {
      plain: 'Text',
      b64: 'Base64',
      hex: 'Hex',
      dec: 'Dec',
      bin: 'Bin'
    };
    let encoding = null;
    if (step.showEncoding) {
      encoding = (
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
      );
    }
    const bom = prefs.source === 'plain' && prefs.encoding.startsWith('UTF-16') ? (
      <div className="material-group col-xs-3 col-sm-1 col-md-1">
        <label><abbr title="Byte-order mark">BOM</abbr></label>
        <div className="btn-group">
          <button onClick={this.bomHandler()} className={'btn' + (prefs.bom ? ' active' : '')}>
            <span className={'ionicon ' + (prefs.bom ? 'ion-md-checkbox' : 'ion-md-square-outline')}/> On
          </button>
        </div>
      </div>
    ) : null;
    return (
      <div className="row">
        <div className="material-group col-xs-12 col-sm-6 col-md-6">
          <label>Input Type</label>
          <div className="btn-group">
            {Object.keys(sources).map((source) => {
              return (<button key={source} onClick={this.sourceHandler(source)} className={'btn' + (prefs.source === source ? ' active' : '')}>
                <span className={'ionicon ' + (prefs.source === source ? 'ion-md-checkbox' : 'ion-md-square-outline')}/> {sources[source]}
              </button>);
            })}
          </div>
        </div>
        {encoding}
        {bom}
      </div>
    );
  }

  settingHandler = (settingFunc) => {
    return (e) => {
      settingFunc(e.target.value);
      this.props.refresh();
    };
  };

  sourceHandler = (source) => {
    return () => {
      this.props.step.setSource(source);
      this.props.refresh();
    };
  };

  bomHandler = () => {
    return () => {
      this.props.step.toggleBom();
      this.props.refresh();
    };
  }

}

class TextToBytes extends Step {

  static title = 'Text \u2192 Bytes';
  static supports = [ StringType ];
  static output = ByteArrayType;
  static form = TextToBytesForm;

  showEncoding = true;

  prefs = {
    source: 'plain',
    encoding: 'UTF-8',
    bom: false
  };

  setSource = (v) => { this.prefs.source = v; this._update(); };
  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };
  toggleBom = () => { this.prefs.bom = !this.prefs.bom; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    this.showEncoding = false;
    switch (this.prefs.source) {
    case 'hex':
    case 'dec':
    case 'bin':
    case 'b64':
      try {
        return Data.byteArray(ByteUtils.baseStringToUint8Array(input.data, this.prefs.source));
      } catch (e) {
        if (e instanceof OutOfRangeError && this.prefs.source === 'dec') {
          return Data.invalid('Your input can\'t be converted from decimal because it contains values over 255. Separators are needed between decimal bytes.');
        } else {
          throw e;
        }
      }
    case 'plain':
    default: {
      this.showEncoding = true;
      try {
        return Data.byteArray(StringUtils.jsStringToUint8Array(input.data, this.prefs));
      } catch (e) {
        if (e instanceof OutOfRangeError) {
          if (this.prefs.encoding === 'ISO-8859-1') {
            return Data.invalid('Input contains multi-byte characters and cannot be encoded as ISO-8859-1');
          } else {
            return Data.invalid('Received unexpected out-of-range byte value!');
          }
        } else if (e instanceof ConversionError) {
          return Data.invalid(e.message);
        } else {
          throw e;
        }
      }
    }}
  }

}

TextToBytesForm.propTypes = {
  step: PropTypes.instanceOf(TextToBytes).isRequired,
  refresh: PropTypes.func.isRequired
};

export default TextToBytes;