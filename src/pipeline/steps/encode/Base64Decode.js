import * as util from 'node-forge/lib/util';
import { ByteDecodeForm } from './AbstractByteDecode';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class Base64Decode extends Step {

  static title = 'Base64 Decode';
  static variantTitle = 'Decode';
  static supports = [ StringType ];
  static rtl = true;
  static form = ByteDecodeForm;

  direction = 'ltr';

  prefs = {
    encoding: 'UTF-8'
  };

  setEncoding = (v) => { this.prefs.encoding = v; this._update(); };

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    // Remove newlines and convert from URL safe to standard, then pad to multiple of 4
    let data = input.data.replace(/[^A-Za-z0-9+/=\-_]/g, '').replace(/-/g, '+').replace(/_/g, '/');
    while (data.length % 4 !== 0) {
      data += '=';
    }
    switch (this.prefs.encoding) {
    case 'UTF-8':
      try {
        return Data.string(util.decodeUtf8(util.decode64(data)));
      } catch (e) {
        return Data.invalid('Input cannot be decoded as UTF-8 - try another character encoding.');
      }
    case 'UTF-16': {
      const uint8Array = util.binary.raw.decode(util.decode64(data));
      return this.uint8ArrayToUtf16(uint8Array, 'big');
    }
    case 'UTF-16LE': {
      const uint8Array = util.binary.raw.decode(util.decode64(data));
      return this.uint8ArrayToUtf16(uint8Array, 'little');
    }
    case 'UTF-16AUTO': {
      const uint8Array = util.binary.raw.decode(util.decode64(data));
      return this.uint8ArrayToUtf16(uint8Array, 'auto');
    }
    case 'ISO-8859-1':
    default:
      return Data.string(util.decode64(data));
    }
  }

  uint8ArrayToUtf16(bytes, endian) {
    let start = 0;
    let info = '';
    if (bytes.length >= 2) {
      const bom = (bytes[0] << 8) + bytes[1];
      if (endian === 'auto') {
        if (bom === 0xFFFE) {
          start = 2;
          endian = 'little';
          info = 'Found little-endian byte order mark';
        } else if (bom === 0xFEFF) {
          start = 2;
          endian = 'big';
          info = 'Found big-endian byte order mark';
        } else {
          endian = 'big';
          info = 'No byte order mark - assuming big-endian';
        }
      } else if (bom === 0xFFFE) {
        start = 2;
        info = 'Stripped little-endian byte order mark (FF FE)';
      } else if (bom === 0xFEFF) {
        start = 2;
        info = 'Stripped big-endian byte order mark (FE FF)';
      }
    }
    let string = '';
    for (let i = start; i < bytes.length; i += 2) {
      const charCode = endian === 'little' ? (bytes[i + 1] << 8) + bytes[i] : (bytes[i] << 8) + bytes[i + 1];
      string += String.fromCharCode(charCode);
    }
    const result = Data.string(string);
    if (info) {
      result.addInfo(info);
    }
    return result;
  }

}

export default Base64Decode;
