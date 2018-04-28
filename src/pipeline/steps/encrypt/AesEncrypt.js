import * as util from 'node-forge/lib/util';
import * as random from 'node-forge/lib/random';
import * as cipher from 'node-forge/lib/cipher';
import React, { Component } from 'react';
import ByteUtils from '../../../lib/ByteUtils';
import PropTypes from 'prop-types';
import Step from '../Step';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

class AesEncryptForm extends Component {

  render() {
    const step = this.props.step;
    const prefs = step.prefs;
    const keyClass = step.keyValid ? '' : ' has-error';

    return (
      <form className="form-inline row">
        <div className="material-group col-xs-6 col-sm-3 col-md-2">
          <label>Mode</label>
          <select onChange={this.settingHandler(step.setCipher)} value={prefs.cipher}>
            <option value="AES-128-CBC">AES-128-CBC</option>
            <option value="AES-192-CBC">AES-192-CBC</option>
            <option value="AES-256-CBC">AES-256-CBC</option>
          </select>
        </div>
        <div className="material-group col-xs-6 col-sm-3 col-md-2">
          <label>Key Type</label>
          <select onChange={this.settingHandler(step.setKeyType)} value={prefs.keyType}>
            <option value="hex">Hex</option>
            <option value="b64">Base64</option>
          </select>
        </div>
        <div className={'material-group col-xs-12 col-sm-6 col-md-8' + keyClass}>
          <label>Key</label>
          <input type="text" value={prefs.key} onChange={this.settingHandler(step.setKey)}/>
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

class AesEncrypt extends Step {

  static title = 'AES Encrypt';
  static variantTitle = 'Encrypt';
  static supports = [ ByteStringBufferType ];
  static form = AesEncryptForm;
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


  prefs = {
    cipher: 'AES-128-CBC',
    keyType: 'hex',
    key: '',
    iv: null
  };

  setCipher = (v) => { this.prefs.cipher = v; this._update(); };
  setKeyType = (v) => { this.prefs.keyType = v; this._update(); };
  setKey = (v) => { this.prefs.key = v; this._update(); };

  // Provided for testing. Accepts a hex string IV.
  setIv = (v) => { this.prefs.iv = v; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    const cipherConf = AesEncrypt.ciphers[this.prefs.cipher];
    const iv = this.prefs.iv || random.getBytesSync(16);

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

    const aes = cipher.createCipher(cipherConf.ref, key);
    aes.start({iv: iv});
    aes.update(input.data.copy());
    aes.finish();
    return Data.byteStringBuffer(aes.output).addInfo('Cipher: AES, Key Size: ' + (cipherConf.size / 8) + ', Mode: ' + cipherConf.mode + ', IV: Random, Padding: PKCS#7');
  }

}

AesEncryptForm.propTypes = {
  step: PropTypes.instanceOf(AesEncrypt).isRequired,
  refresh: PropTypes.func.isRequired
};

export {AesEncryptForm};
export default AesEncrypt;
