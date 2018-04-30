import ByteUtils from './ByteUtils';

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

  static jsStringToUtf8ByteString(string) {
    return unescape(encodeURIComponent(string));
  }

}

export default StringUtils;