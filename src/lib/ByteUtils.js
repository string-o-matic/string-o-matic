import * as util from 'node-forge/lib/util';

class ByteUtils {

  static baseConfig = {
    2: {
      chars: 8,
      disallowed: /[^01 ]/g,
      prefix: /0b/g,
      leBom: '11111111 11111110',
      beBom: '11111110 11111111'
    },
    10: {
      disallowed: /[^0-9 ]/g,
      leBom: '255 254',
      beBom: '254 255'
    },
    16: {
      chars: 2,
      disallowed: /[^0-9a-f ]/g,
      prefix: /0x/g,
      leBom: 'FF FE',
      beBom: 'FE FF'
    }
  };

  /**
   * Decode a string containing encoded bytes e.g hex '0xAA 0xBB', decimal '128 63', binary '1001 10110111' into an array of
   * uint(8) integers. Will throw an exception if there are any above 0xFF.
   * @param data {String} input string
   * @param base {Number} 2 = binary, 10 = decimal, 16 = hex
   * @returns {Array<Number>}
   */
  static baseStringToUint8Array(data, base) {
    const conf = this.baseConfig[base];
    const splitter = conf.chars ? new RegExp('.{1,' + conf.chars + '}', 'g') : null;

    // Clean and standardise the string replacing all characters not in the alphabet with spaces so they're treated as
    // byte separators.
    data = data.toLowerCase();
    if (conf.prefix) {
      data = data.replace(conf.prefix, ' ');
    }
    if (conf.disallowed) {
      data = data.replace(conf.disallowed, ' ');
    }

    return data
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
        const uint8 = parseInt(e, base);
        if (uint8 > 0xFF) {
          throw new Error('String contains invalid bytes');
        }
        return uint8;
      }) || [];
  }

  /**
   * Decodes a hex/decimal/binary string into a forge ByteStringBuffer.
   * @param data {String} input string.
   * @param base {Number} 2 = binary, 10 = decimal, 16 = hex
   * @returns {ByteStringBuffer}
   */
  static baseStringToByteStringBuffer(data, base) {
    return new util.ByteStringBuffer(this.baseStringToBinaryString(data, base));
  }

  /**
   * Decodes a hex/decimal/binary string into a forge ByteStringBuffer.
   * @param data {String} input string.
   * @param base {Number} 2 = binary, 10 = decimal, 16 = hex
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