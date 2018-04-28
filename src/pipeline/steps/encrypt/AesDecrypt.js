import * as util from 'node-forge/lib/util';
import * as aes from 'node-forge/lib/aes';
import * as cipher from 'node-forge/lib/cipher';
import React, { Component } from 'react';
import ByteUtils from '../../../lib/ByteUtils';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

// TODO option to copy iv and key from preceding aes encrypt step
// TODO combine with encrypt step if possible
class AesDecryptForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;

    return (
      <form className="form-inline">
        <div className="row">
          <div className="material-group col-xs-6 col-sm-3 col-md-2">
            <label>Mode</label>
            <select onChange={this.settingHandler(step.setCipher)} value={prefs.cipher}>
              <option value="AES-128-CBC">AES-128-CBC</option>
              <option value="AES-192-CBC">AES-192-CBC</option>
              <option value="AES-256-CBC">AES-256-CBC</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="material-group col-xs-6 col-sm-3 col-md-2">
            <label>Key Type</label>
            <select onChange={this.settingHandler(step.setKeyType)} value={prefs.keyType}>
              <option value="hex">Hex</option>
              <option value="b64">Base64</option>
            </select>
          </div>
          <div className={'material-group col-xs-12 col-sm-6 col-md-8' + (step.keyValid ? '' : ' has-error')}>
            <label>Key</label>
            <input type="text" value={prefs.key} onChange={this.settingHandler(step.setKey)}/>
          </div>
        </div>
        <div className="row">
          <div className="material-group col-xs-6 col-sm-3 col-md-2">
            <label>IV Type</label>
            <select onChange={this.settingHandler(step.setIvType)} value={prefs.ivType}>
              <option value="hex">Hex</option>
              <option value="b64">Base64</option>
            </select>
          </div>
          <div className={'material-group col-xs-12 col-sm-6 col-md-8' + (step.ivValid ? '' : ' has-error')}>
            <label>IV</label>
            <input type="text" value={prefs.iv} onChange={this.settingHandler(step.setIv)}/>
          </div>
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

class AesDecrypt extends Step {

  constructor() {
    super();
    // aes import is needed to make it available, this stops lint errors
    aes.keepMe = true;
  }

  static title = 'AES Decrypt';
  static variantTitle = 'Decrypt';
  static supports = [ ByteStringBufferType ];
  static form = AesDecryptForm;
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

  showEncoding = false;
  keyValid = false;
  ivValid = false;

  prefs = {
    cipher: 'AES-128-CBC',
    keyType: 'hex',
    key: '',
    ivType: 'hex',
    iv: ''
  };

  setCipher = (v) => { this.prefs.cipher = v; this._update(); };
  setKeyType = (v) => { this.prefs.keyType = v; this._update(); };
  setKey = (v) => { this.prefs.key = v; this._update(); };
  setIvType = (v) => { this.prefs.ivType = v; this._update(); };
  setIv = (v) => { this.prefs.iv = v; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    const cipherConf = AesDecrypt.ciphers[this.prefs.cipher];

    let key = null;
    if (this.prefs.keyType === 'hex') {
      key = ByteUtils.baseStringToByteStringBuffer(this.prefs.key, 16);
    } else {
      key = new util.ByteStringBuffer(util.decode64(this.prefs.key));
    }
    if (key.length() !== cipherConf.size / 8) {
      this.keyValid = false;
      return Data.invalid(this.prefs.cipher + ' requires a ' + (cipherConf.size / 8) + ' byte key. Your key is ' + key.length() + ' bytes.');
    } else {
      this.keyValid = true;
    }

    let iv = null;
    if (this.prefs.ivType === 'hex') {
      iv = ByteUtils.baseStringToByteStringBuffer(this.prefs.iv, 16);
    } else {
      iv = new util.ByteStringBuffer(util.decode64(this.prefs.iv));
    }
    if (iv.length() !== 16) {
      this.ivValid = false;
      return Data.invalid(this.prefs.cipher + ' requires a 16 byte IV. Your IV is ' + iv.length() + ' bytes.');
    } else {
      this.ivValid = true;
    }

    const aes = cipher.createDecipher(cipherConf.ref, key);
    aes.start({iv: iv});
    aes.update(input.data.copy());
    const result = aes.finish();
    if (!result) {
      return Data.invalid('Decryption failed! This probably means your key is incorrect.');
    } else {
      return Data.byteStringBuffer(aes.output).addInfo('Cipher: AES, Key Size: ' + (cipherConf.size / 8) + ', Mode: ' + cipherConf.mode + ', IV: Random, Padding: PKCS#7');
    }
  }

}

AesDecryptForm.propTypes = {
  step: PropTypes.instanceOf(AesDecrypt).isRequired,
  refresh: PropTypes.func.isRequired
};

export {AesDecryptForm};
export default AesDecrypt;
