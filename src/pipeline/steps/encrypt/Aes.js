import * as random from 'node-forge/lib/random';
import * as aes from 'node-forge/lib/aes';
import React, { Component } from 'react';
import ByteUtils from '../../../lib/ByteUtils';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {ByteStringBufferType, StringType} from '../../Types';
import Globals from '../../../Globals';
import './Aes.css';

class AesForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;

    const keyContext = step.allowContextKey ? (<option value="context">Encrypt step</option>) : null;
    const ivContext = step.allowContextIv ? (<option value="context">Encrypt step</option>) : null;

    let keyRegen = null;
    if (step.allowRandomKey && prefs.keyType !== 'context') {
      keyRegen = (<button onClick={this.resetKey} className="regen"><span className="ion-md-refresh"/></button>);
    }
    let ivRegen = null;
    if (step.allowRandomIv && prefs.ivType !== 'context') {
      ivRegen = (<button onClick={this.resetIv} className="regen"><span className="ion-md-refresh"/></button>);
    }

    return (
      <div>
        <div className="row">
          <div className="material-group col-xs-12 col-sm-6 col-md-4">
            <label>Key Size</label>
            <div className="btn-group">
              {[128, 192, 256].map((keySize) => {
                return (<button key={keySize} onClick={this.keySizeHandler(keySize)} className={'btn' + (prefs.keySize === keySize ? ' active' : '')}>
                  <span className={'ionicon ' + (prefs.keySize === keySize ? 'ion-md-checkbox' : 'ion-md-square-outline')}/> {keySize}
                </button>);
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="material-group col-xs-4 col-sm-3 col-md-2">
            <label>Key Source</label>
            <select onChange={this.settingHandler(step.setKeyType)} value={prefs.keyType}>
              <option value="hex">Hex</option>
              <option value="b64">Base64</option>
              {keyContext}
            </select>
          </div>
          <div className={'material-group col-xs-8 col-sm-9 col-md-10' + (step.keyValid ? '' : ' has-error')}>
            <label>Key</label>
            <input type="text" value={prefs.key} onChange={this.settingHandler(step.setKey)} className="has-button" {...Globals.noAutoComplete}/>
            {keyRegen}
          </div>
        </div>
        <div className="row">
          <div className="material-group col-xs-4 col-sm-3 col-md-2">
            <label>IV Source</label>
            <select onChange={this.settingHandler(step.setIvType)} value={prefs.ivType}>
              <option value="hex">Hex</option>
              <option value="b64">Base64</option>
              {ivContext}
            </select>
          </div>
          <div className={'material-group col-xs-8 col-sm-9 col-md-10' + (step.ivValid ? '' : ' has-error')}>
            <label>IV</label>
            <input type="text" value={prefs.iv} onChange={this.settingHandler(step.setIv)} className="has-button" {...Globals.noAutoComplete}/>
            {ivRegen}
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

  keySizeHandler = (keySize) => {
    return () => {
      this.props.step.setKeySize(keySize);
      this.props.refresh();
    };
  };

  resetKey = () => {
    this.props.step.generateKey();
    this.props.refresh();
  };

  resetIv = () => {
    this.props.step.generateIv();
    this.props.refresh();
  };

}

class Aes extends Step {

  constructor() {
    super();
    // aes import is needed to make it available, this stops lint errors
    aes.keepMe = true;
  }

  static supports = [ StringType, ByteStringBufferType ];
  static input = ByteStringBufferType;
  static output = ByteStringBufferType;
  static form = AesForm;

  keyValid = false;
  ivValid = false;
  allowRandomKey = true;
  allowRandomIv = true;
  allowContextIv = false;
  allowContextKey = false;

  contextKey = null;
  contextIv = null;

  prefs = {
    source: 'plain',
    encoding: 'UTF-8',
    keySize: 128,
    mode: 'CBC',
    keyType: 'hex',
    key: '',
    ivType: 'hex',
    iv: ''
  };

  setKeySize = (v) => { this.prefs.keySize = v; this._update(); };
  setKeyType = (v) => { this.prefs.keyType = v; this.prefs.key = ''; this._update(); };
  setKey = (v) => {
    if (this.prefs.keyType === 'context' && this.contextKey) {
      this.prefs.keyType = this.contextKey.encoding;
    }
    this.prefs.key = v;
    this._update();
  };
  setIvType = (v) => { this.prefs.ivType = v; this.prefs.iv = ''; this._update(); };
  setIv = (v) => {
    if (this.prefs.ivType === 'context' && this.contextIv) {
      this.prefs.ivType = this.contextIv.encoding;
    }
    this.prefs.iv = v;
    this._update();
  };

  generateKey = () => {
    const keyBytes = random.getBytesSync(this.prefs.keySize / 8);
    this.prefs.key = ByteUtils.byteStringToBaseString(keyBytes, this.prefs.keyType, { separator: '' });
    this._update();
  };

  generateIv = () => {
    const ivBytes = random.getBytesSync(16);
    this.prefs.iv = ByteUtils.byteStringToBaseString(ivBytes, this.prefs.ivType, { separator: '' });
    this._update();
  };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    if (input.context['aes.encrypt.key']) {
      this.allowContextKey = true;
    } else if (this.prefs.keyType === 'context') {
      this.prefs.keyType = 'hex';
    }
    if (input.context['aes.encrypt.iv']) {
      this.allowContextIv = true;
    } else if (this.prefs.ivType === 'context') {
      this.prefs.ivType = 'hex';
    }

    let key = null;
    if (this.allowContextKey && this.prefs.keyType === 'context') {
      this.contextKey = input.context['aes.encrypt.key'];
      key = this.contextKey;
      this.prefs.key = key.string;
    } else {
      key = {
        string: this.prefs.key,
        encoding: this.prefs.keyType,
        byteStringBuffer: ByteUtils.baseStringToByteStringBuffer(this.prefs.key, this.prefs.keyType)
      };
    }

    let iv = null;
    if (this.allowContextIv && this.prefs.ivType === 'context') {
      this.contextIv = input.context['aes.encrypt.iv'];
      iv = this.contextIv;
      this.prefs.iv = iv.string;
    } else {
      iv = {
        string: this.prefs.iv,
        encoding: this.prefs.ivType,
        byteStringBuffer: ByteUtils.baseStringToByteStringBuffer(this.prefs.iv, this.prefs.ivType)
      };
    }

    this.keyValid = key.byteStringBuffer.length() === this.prefs.keySize / 8;
    this.ivValid = iv.byteStringBuffer.length() === 16;
    if (!this.keyValid) {
      return Data.invalid('AES-' + this.prefs.keySize + ' requires a ' + (this.prefs.keySize / 8) + ' byte key. Your key is ' + key.byteStringBuffer.length() + ' bytes.');
    }
    if (!this.ivValid) {
      return Data.invalid('AES-' + this.prefs.keySize + ' requires a 16 byte IV. Your IV is ' + iv.byteStringBuffer.length() + ' bytes.');
    }

    return this._calculate(key, iv, input.data.copy());
  }

  _calculate() {
    throw Error('Override this method');
  }

}

AesForm.propTypes = {
  step: PropTypes.instanceOf(Aes).isRequired,
  refresh: PropTypes.func.isRequired
};

export default Aes;
