import ByteUtils from './ByteUtils';

class ConversionError {
  constructor(message) {
    this.message = message;
  }
}

class StringUtils {

  /**
   *
   * @param string {String}
   * @param base {String}
   * @param opts {Object=}
   * @returns {String}
   */
  static jsStringToBaseString(string, base, opts) {
    const encoding = (opts && opts.encoding) || 'UTF-8';
    switch (encoding) {
    case 'UTF-8':
      return ByteUtils.byteStringToBaseString(this.jsStringToUtf8ByteString(string), base, opts);
    case 'UTF-16BE':
    case 'UTF-16LE': {
      if (opts && opts.bom) {
        string = '\ufeff' + string;
      }
      const uint8Array = new Uint8Array(string.length * 2);
      const view = new DataView(uint8Array.buffer);
      for (let i = 0; i < string.length; i++) {
        view.setUint16(i * 2, string.charCodeAt(i), encoding === 'UTF-16LE');
      }
      return ByteUtils.uint8ArrayToBaseString(uint8Array, base, opts);
    }
    default:
      return ByteUtils.byteStringToBaseString(string, base, opts);
    }
  }

  static jsStringToUint8Array(string, opts) {
    const encoding = (opts && opts.encoding) || 'UTF-8';
    switch (encoding) {
    case 'UTF-8':
      return ByteUtils.byteStringToUint8Array(this.jsStringToUtf8ByteString(string));
    case 'UTF-16BE':
    case 'UTF-16LE': {
      if (opts && opts.bom) {
        string = '\ufeff' + string;
      }
      const uint8Array = new Uint8Array(string.length * 2);
      const view = new DataView(uint8Array.buffer);
      for (let i = 0; i < string.length; i++) {
        view.setUint16(i * 2, string.charCodeAt(i), encoding === 'UTF-16LE');
      }
      return uint8Array;
    }
    default:
      return ByteUtils.byteStringToUint8Array(string);
    }
  }

  static jsStringToUtf8ByteString(string) {
    return unescape(encodeURIComponent(string));
  }

  /**
   * Convert a byte array into a javascript string, given the specified encoding. For UTF-16, the byte-order mark is
   * stripped if present and will be used to select the endianness if the encoding is 'UTF-16' without the BE or LE
   * suffix.
   * @param uint8Array {Uint8Array}
   * @param encoding {string}
   * @returns {{string: string, info: string}}
   */
  static uint8ArrayToJsString(uint8Array, encoding) {
    let width = 1;
    let endian = null;
    if (encoding.indexOf('UTF-16') === 0) {
      width = 2;
      endian = encoding.substring(6);
    }

    let start = 0;
    let info = null;
    if (width === 2 && uint8Array.length >= 2) {
      const bom = (uint8Array[0] << 8) + uint8Array[1];
      if (!endian) {
        if (bom === 0xFFFE) {
          start = 2;
          endian = 'LE';
          info = 'Found little-endian byte order mark';
        } else if (bom === 0xFEFF) {
          start = 2;
          endian = 'BE';
          info = 'Found big-endian byte order mark';
        } else {
          endian = 'BE';
          info = 'No byte order mark - assuming big-endian';
        }
      } else if (bom === 0xFFFE) {
        start = 2;
        info = 'Stripped little-endian byte order mark';
      } else if (bom === 0xFEFF) {
        start = 2;
        info = 'Stripped big-endian byte order mark';
      }
    }

    let string = '';
    for (let i = start; i < uint8Array.length - (width - 1); i += width) {
      let b = uint8Array[i];
      if (width === 2) {
        let b2 = uint8Array[i + 1];
        if (endian === 'LE') {
          b = (b2 << 8) + b;
        } else {
          b = (b << 8) + b2;
        }
      }
      string += String.fromCharCode(b);
    }
    if (encoding === 'UTF-8') {
      try {
        string = decodeURIComponent(escape(string));
      } catch (e) {
        throw new ConversionError('Input cannot be decoded as UTF-8 - try another character encoding.');
      }
    }
    return { string: string, info: info };
  }

}

export {ConversionError};
export default StringUtils;