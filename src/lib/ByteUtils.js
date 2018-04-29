import * as util from 'node-forge/lib/util';

/**
 * Utils for converting baseN strings (hex, decimal, binary and base64) to binary strings, Uint8Arrays and back again.
 * Works with single bytes only, character encoding is not accounted for. Will error if a string encodes a value greater
 * than 0xFF, which should only really be possible with decimal e.g. '999 999'. Uses best effort parsing, stripping out
 * all characters not in the alphabet for the selected base and cutting up groups where necessary e.g. '606b 7963' ->
 * '60 6b 79 63'.
 */
class ByteUtils {

  static baseConfig = {
    bin: {
      base: 2,
      chars: 8,
      disallowed: /[^01 ]/g,
      prefix: /0b/g,
      leBom: '11111111 11111110',
      beBom: '11111110 11111111'
    },
    dec: {
      base: 10,
      disallowed: /[^0-9 ]/g,
      leBom: '255 254',
      beBom: '254 255'
    },
    hex: {
      base: 16,
      chars: 2,
      disallowed: /[^0-9a-fA-F ]/g,
      prefix: /0x/g,
      leBom: 'FF FE',
      beBom: 'FE FF'
    },
    b64: {
      disallowed: /[^A-Za-z0-9+/=\-_]/g
    }
  };

  /**
   * Decode a string containing encoded bytes e.g hex '0xAA 0xBB', decimal '128 63', binary '1001 10110111' into an array of
   * uint(8) integers. Will throw an exception if there are any above 0xFF.
   * @param data {String} input string
   * @param encoding {String} bin, hex, dec or b64
   * @returns {Array<Number>}
   */
  static baseStringToUint8Array(data, encoding) {
    if (encoding === 'b64') {
      return this.base64StringToUint8Array(data);
    }
    const conf = this.baseConfig[encoding];
    const splitter = conf.chars ? new RegExp('.{1,' + conf.chars + '}', 'g') : null;

    // Clean and standardise the string replacing all characters not in the alphabet with spaces so they're treated as
    // byte separators.
    if (conf.prefix) {
      data = data.replace(conf.prefix, ' ');
    }
    if (conf.disallowed) {
      data = data.replace(conf.disallowed, ' ');
    }

    return data
      .toLowerCase()
      .split(' ')
      .filter((e) => e.length > 0)
      .reduce((r, e) => {
        if (splitter && e.length > conf.chars) {
          r.push(...e.match(splitter));
        } else {
          r.push(e);
        }
        return r;
      }, [])
      .map((e) => {
        const uint8 = parseInt(e, conf.base);
        if (uint8 > 0xFF) {
          throw new Error('out_of_range');
        }
        return uint8;
      }) || [];
  }

  /**
   * Special case for base64. Handles standard and URL-safe base64 strings.
   * @param data {String}
   */
  static base64StringToUint8Array(data) {
    const conf = this.baseConfig.b64;
    if (conf.disallowed) {
      data = data.replace(conf.disallowed, ' ');
    }
    data = data.replace(/-/g, '+').replace(/_/g, '/');
    while (data.length % 4 !== 0) {
      data += '=';
    }
    let binaryString = util.decode64(data);
    return binaryString
      .split('')
      .map((e) => {
        return e.charCodeAt(0);
      });
  }

  /**
   * Decodes a hex/decimal/binary string into a forge ByteStringBuffer.
   * @param data {String} input string.
   * @param base {String} bin, hex, dec or b64
   * @returns {ByteStringBuffer}
   */
  static baseStringToByteStringBuffer(data, base) {
    return new util.ByteStringBuffer(this.baseStringToBinaryString(data, base));
  }

  /**
   * Decodes a hex/decimal/binary string into a forge ByteStringBuffer.
   * @param data {String} input string.
   * @param base {String} bin, hex, dec or b64
   * @returns {String}
   */
  static baseStringToBinaryString(data, base) {
    const bytes = this.baseStringToUint8Array(data, base);
    let start = 0;
    let string = '';
    for (let i = start; i < bytes.length; i++) {
      string += String.fromCharCode(bytes[i]);
    }
    return string;
  }

}
export default ByteUtils;