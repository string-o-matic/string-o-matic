import * as util from 'node-forge/lib/util';
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

// TODO drop the random option and use the generate button to generate random for b64 or hex options in appropriate format
class AesForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;

    const keyRandom = step.allowRandomKey ? (<option value="random">Random</option>) : null;
    const ivRandom = step.allowRandomIv ? (<option value="random">Random</option>) : null;
    const keyContext = step.allowContextKey ? (<option value="context">Encrypt step</option>) : null;
    const ivContext = step.allowContextIv ? (<option value="context">Encrypt step</option>) : null;

    let keyRegen = null;
    if (step.prefs.keyType === 'random') {
      keyRegen = (<button onClick={this.resetKey} className="regen"><span className="ion-md-refresh"/></button>);
    }
    let ivRegen = null;
    if (step.prefs.ivType === 'random') {
      ivRegen = (<button onClick={this.resetIv} className="regen"><span className="ion-md-refresh"/></button>);
    }

    return (
      <div>
        <div className="row">
          <div className="material-group col-xs-6 col-sm-3 col-md-2">
            <label>Cipher</label>
            <select onChange={this.settingHandler(step.setCipher)} value={prefs.cipher}>
              <option value="AES-128-CBC">AES-128-CBC</option>
              <option value="AES-192-CBC">AES-192-CBC</option>
              <option value="AES-256-CBC">AES-256-CBC</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="material-group col-xs-4 col-sm-3 col-md-2">
            <label>Key Source</label>
            <select onChange={this.settingHandler(step.setKeyType)} value={prefs.keyType}>
              <option value="hex">Hex Entry</option>
              <option value="b64">Base64 Entry</option>
              {keyContext}
              {keyRandom}
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
              <option value="hex">Hex Entry</option>
              <option value="b64">Base64 Entry</option>
              {ivContext}
              {ivRandom}
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

  resetKey = () => {
    this.props.step.setKey('');
    this.props.refresh();
  };

  resetIv = () => {
    this.props.step.setIv('');
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
  static ciphers = {
    'AES-128-CBC': {
      ref: 'AES-CBC',
      size: 128,
      mode: 'CBC'
    },
    'AES-192-CBC': {
      ref: 'AES-CBC',
      size: 192,
      mode: 'CBC'
    },
    'AES-256-CBC': {
      ref: 'AES-CBC',
      size: 256,
      mode: 'CBC'
    }
  };

  keyValid = false;
  ivValid = false;
  allowRandomKey = true;
  allowRandomIv = true;
  allowContextIv = false;
  allowContextKey = false;

  prefs = {
    source: 'plain',
    encoding: 'UTF-8',
    cipher: 'AES-128-CBC',
    keyType: 'hex',
    key: '',
    ivType: 'hex',
    iv: ''
  };

  setCipher = (v) => { this.prefs.cipher = v; this._update(); };
  setKeyType = (v) => { this.prefs.keyType = v; this.prefs.key = ''; this._update(); };
  setKey = (v) => { this.prefs.key = v; this._update(); };
  setIvType = (v) => { this.prefs.ivType = v; this.prefs.iv = ''; this._update(); };
  setIv = (v) => { this.prefs.iv = v; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    const cipherConf = Aes.ciphers[this.prefs.cipher];

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
      key = input.context['aes.encrypt.key'];
      this.prefs.key = key.toHex();
    } else if (this.allowRandomKey && this.prefs.keyType === 'random') {
      if (!this.prefs.key || this.prefs.key.length === 0) {
        key = new util.ByteStringBuffer(random.getBytesSync(cipherConf.size / 8));
        this.prefs.key = key.toHex();
      } else {
        key = ByteUtils.baseStringToByteStringBuffer(this.prefs.key, 'hex');
      }
    } else {
      key = ByteUtils.baseStringToByteStringBuffer(this.prefs.key, this.prefs.keyType);
    }

    let iv = null;
    if (this.allowContextIv && this.prefs.ivType === 'context') {
      iv = input.context['aes.encrypt.iv'];
      this.prefs.iv = iv.toHex();
    } else if (this.allowRandomIv && this.prefs.ivType === 'random') {
      if (!this.prefs.iv || this.prefs.iv.length === 0) {
        iv = new util.ByteStringBuffer(random.getBytesSync(16));
        this.prefs.iv = iv.toHex();
      } else {
        iv = ByteUtils.baseStringToByteStringBuffer(this.prefs.iv, 'hex');
      }
    } else {
      iv = ByteUtils.baseStringToByteStringBuffer(this.prefs.iv, this.prefs.ivType);
    }

    this.keyValid = key.length() === cipherConf.size / 8;
    this.ivValid = iv.length() === 16;
    if (!this.keyValid) {
      return Data.invalid(this.prefs.cipher + ' requires a ' + (cipherConf.size / 8) + ' byte key. Your key is ' + key.length() + ' bytes.');
    }
    if (!this.ivValid) {
      return Data.invalid(this.prefs.cipher + ' requires a 16 byte IV. Your IV is ' + iv.length() + ' bytes.');
    }

    return this._calculate(cipherConf, key, iv, input.data.copy());
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
