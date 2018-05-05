import * as util from 'node-forge/lib/util';

class OutOfRangeError {

}

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
      prefix: /0b/g
    },
    dec: {
      base: 10,
      disallowed: /[^0-9 ]/g
    },
    hex: {
      base: 16,
      chars: 2,
      disallowed: /[^0-9a-fA-F ]/g,
      prefix: /0x/g
    },
    b64: {
      disallowed: /[^A-Za-z0-9+/=\-_]/g
    }
  };

  /**
   * Encode binary data in a uint8array as bin, dec or hex. Throws OutOfRangeError if the array contains a value > 0xFF.
   * @param uint8Array {Uint8Array} Array of ints between 0 and 255.
   * @param base {String} bin, dec, hex or b64
   * @param opts {Object=} options: separator (not b64), suffix (not b64), prefix (not b64), line length, case (hex only), variant (b64 only)
   */
  static uint8ArrayToBaseString(uint8Array, base, opts) {
    if (base === 'b64') {
      return this.byteStringBufferToBase64String(new util.ByteStringBuffer(uint8Array), opts);
    }
    let bytesPerLine = (opts && opts.bytesPerLine) || 0;
    let separator = (opts && opts.separator) || '';
    let prefix = (opts && opts.prefix) || '';
    let suffix = (opts && opts.suffix) || '';
    let strArray = new Array(uint8Array.length);
    if (uint8Array.length > 0) {
      for (let i = 0; i < uint8Array.length; i++) {
        const uint8 = uint8Array[i];
        if (uint8 > 0xFF || uint8 < 0x00) {
          throw new OutOfRangeError();
        }
        let terminator = '';
        if (i < uint8Array.length - 1) {
          if (bytesPerLine && (i + 1) % bytesPerLine === 0) {
            terminator = '\n';
          } else {
            terminator = separator;
          }
        }
        let str = this.uint8ToBaseString(uint8Array[i], base);
        if (base === 'hex' && opts && opts.case === 'upper') {
          str = str.toUpperCase();
        }
        strArray[i] = prefix + str + suffix + terminator;
      }
    }
    return strArray.join('');
  }

  /**
   * Encode binary data in a byte string buffer as bin, dec or hex.
   * @param buffer {ByteStringBuffer}
   * @param base {String}
   * @param opts {Object=}
   */
  static byteStringBufferToBaseString(buffer, base, opts) {
    if (base === 'b64') {
      return this.byteStringBufferToBase64String(buffer, opts);
    }
    return this.uint8ArrayToBaseString(this.byteStringBufferToUint8Array(buffer), base, opts);
  }

  /**
   * Convert a forge byte string buffer to a Uint8Array. Throws an exception if there's an out of range byte.
   * @param buffer {ByteStringBuffer}
   * @return {Uint8Array}
   */
  static byteStringBufferToUint8Array(buffer) {
    let byteString = buffer.copy().getBytes();
    let uint8Array = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      const uint8 = byteString.charCodeAt(i);
      if (uint8 > 0xFF || uint8 < 0x00) {
        throw new OutOfRangeError();
      }
      uint8Array[i] = uint8;
    }
    return uint8Array;
  }

  /**
   *
   * @param string {String}
   * @param base {String}
   * @param opts {Object=}
   * @returns {*|Array}
   */
  static byteStringToBaseString(string, base, opts) {
    const uint8Array = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
      const uint8 = string.charCodeAt(i);
      if (uint8 > 0xFF) {
        throw new OutOfRangeError();
      }
      uint8Array[i] = uint8;
    }
    return this.uint8ArrayToBaseString(uint8Array, base, opts);
  }

  /**
   * Special case for base64. Supports options variant (standard or urlsafe) and lineLength.
   * @param buffer {ByteStringBuffer}
   * @param opts {Object=}
   */
  static byteStringBufferToBase64String(buffer, opts) {
    let result = util.encode64(buffer.copy().getBytes());
    if (opts && opts.variant === 'urlsafe') {
      result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    if (opts && opts.line && opts.line > 0) {
      const pattern = '.{1,' + opts.line + '}';
      const regExp = new RegExp(pattern, 'g');
      const lines = result.match(regExp) || [];
      result = lines.join('\r\n');
    }
    return result;
  }

  /**
   * Decode a string containing encoded bytes e.g hex '0xAA 0xBB', decimal '128 63', binary '1001 10110111' into an array of
   * uint(8) integers. Will throw an exception if there are any above 0xFF.
   * @param data {String} input string
   * @param base {String} bin, hex, dec or b64
   * @returns {Uint8Array}
   */
  static baseStringToUint8Array(data, base) {
    if (base === 'b64') {
      return this.base64StringToUint8Array(data);
    }
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

    return Uint8Array.from(data
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
          throw new OutOfRangeError();
        }
        return uint8;
      }) || []);
  }

  /**
   * Special case for base64. Handles standard and URL-safe base64 strings.
   * @param data {String}
   * @return {Uint8Array}
   */
  static base64StringToUint8Array(data) {
    const conf = this.baseConfig.b64;
    if (conf.disallowed) {
      data = data.replace(conf.disallowed, '');
    }
    data = data.replace(/-/g, '+').replace(/_/g, '/');
    while (data.length % 4 !== 0) {
      data += '=';
    }
    let binaryString = util.decode64(data);
    return Uint8Array.from(binaryString
      .split('')
      .map((e) => {
        return e.charCodeAt(0);
      }));
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

  /**
   * Convert uint8 to a byte string in bin, dec or hex format.
   * @param int {Number}
   * @param base {String}
   * @returns {string}
   */
  static uint8ToBaseString(int, base) {
    const conf = this.baseConfig[base];
    return ('0'.repeat(conf.chars) + int.toString(conf.base)).slice(-conf.chars);
  }

}

export {OutOfRangeError};
export default ByteUtils;