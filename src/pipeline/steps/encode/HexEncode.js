import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class HexEncode extends Step {

  static title = 'Hex Encode';
  static supports = [ StringType, ByteStringBufferType ];

  calculate(input) {
    if (input.type === StringType) {
      const utf16Hex = this.encodeUtf16(input.data);
      // const utf8 = forge.util.bytesToHex(forge.util.encodeUtf8(input.data));
      return Data.string(utf16Hex);
    } else {
      return Data.string(input.data.toHex());
    }
  }

  encodeUtf16(data) {
    var hex, i;
    var result = '';
    for (i = 0; i < data.length; i++) {
      hex = data.charCodeAt(i).toString(16);
      result += ('000' + hex).slice(-4);
    }
    return result
  }

}

export default HexEncode;
