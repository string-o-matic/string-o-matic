import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ByteUtils, {OutOfRangeError} from '../../../lib/ByteUtils';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import * as util from 'node-forge/lib/util';

class TextToBytesForm extends Component {

  // TODO Alerts or grey out the options which don't match the input
  // TODO steps should update their type and encoding in the context so prefs can set automatically
  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    const sources = {
      plain: 'Text',
      b64: 'Base64',
      hex: 'Hex',
      dec: 'Decimal',
      bin: 'Binary'
    };
    const encodings = {
      'UTF-8': 'UTF-8',
      'UTF-16BE': 'UTF-16BE',
      'UTF-16LE': 'UTF-16LE',
      'ISO-8859-1': 'ISO-8859-1'
    };
    let encoding = null;
    if (step.showEncoding) {
      encoding = (
        <div className="material-group col-xs-12 col-sm-6 col-md-6">
          <label>Encoding</label>
          <div className="btn-group">
            {Object.keys(encodings).map((encoding) => {
              return (<button key={encoding} onClick={this.encodingHandler(encoding)} className={'btn' + (prefs.encoding === encoding ? ' active' : '')}>
                <span className={'ionicon ' + (prefs.encoding === encoding ? 'ion-md-checkbox' : 'ion-md-square-outline')}/> {encodings[encoding]}
              </button>);
            })}
          </div>
        </div>
      );
    }
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
      </div>
    );
  }

  sourceHandler = (source) => {
    return () => {
      this.props.step.setSource(source);
      this.props.refresh();
    };
  };

  encodingHandler = (encoding) => {
    return () => {
      this.props.step.setEncoding(encoding);
      this.props.refresh();
    };
  }

}

class TextToBytes extends Step {

  static title = 'Convert Text \u2192 Bytes';
  static selectorTitle = 'Text \u2192 Bytes';
  static supports = [ StringType ];
  static form = TextToBytesForm;

  showEncoding = true;

  prefs = {
    source: 'plain',
    encoding: 'UTF-8'
  };

  setSource = (v) => { this.prefs.source = v; this._update(); };
  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };

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
        return Data.byteStringBuffer(ByteUtils.baseStringToByteStringBuffer(input.data, this.prefs.source));
      } catch (e) {
        if (e instanceof OutOfRangeError && this.prefs.source === 'dec') {
          return Data.invalid('Your input can\'t be converted from decimal because it contains values over 255. Separators are needed between decimal bytes.');
        } else {
          throw e;
        }
      }
    case 'plain':
    case 'binary':
    default: {
      this.showEncoding = true;
      // TODO check for > 0xFF
      switch (this.prefs.encoding) {
      case 'UTF-8':
        return Data.byteStringBuffer(new util.ByteStringBuffer(util.encodeUtf8(input.data)));
      case 'UTF-16BE':
        return this.stringToUtf16BEBytes(input.data);
      case 'UTF-16LE':
        return this.stringToUtf16LEBytes(input.data);
      case 'ISO-8859-1':
      default:
        return this.stringToBytes(input.data);
      }
    }}

  }

  stringToBytes(string) {
    return Data.byteStringBuffer(new util.ByteStringBuffer(string));
  }

  stringToUtf16BEBytes(string) {
    const buffer = new Uint8Array(string.length * 2);
    const view = new DataView(buffer.buffer);
    for (let i = 0; i < string.length; i++) {
      view.setUint16(i * 2, string.charCodeAt(i), false);
    }
    return Data.byteStringBuffer(new util.ByteStringBuffer(buffer));
  }

  stringToUtf16LEBytes(string) {
    const buffer = new Uint8Array(string.length * 2);
    const view = new DataView(buffer.buffer);
    for (let i = 0; i < string.length; i++) {
      view.setUint16(i * 2, string.charCodeAt(i), true);
    }
    return Data.byteStringBuffer(new util.ByteStringBuffer(buffer));
  }

}

TextToBytesForm.propTypes = {
  step: PropTypes.instanceOf(TextToBytes).isRequired,
  refresh: PropTypes.func.isRequired
};

export {TextToBytesForm};
export default TextToBytes;