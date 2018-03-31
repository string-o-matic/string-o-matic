import * as forge from 'node-forge';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class HexEncode extends Step {

  static title = 'Hex Encode';
  static supports = [ StringType, ByteStringBufferType ];

  calculate(input) {
    if (input.type === StringType) {
      if (Globals.ENCODING === 'UTF-8') {
        const utf8Hex = forge.util.bytesToHex(forge.util.encodeUtf8(input.data));
        return Data.string(utf8Hex);
      } else {
        const utf16Hex = this.encodeUtf16(input.data);
        return Data.string(utf16Hex);
      }
    } else {
      return Data.string(input.data.toHex());
    }
  }

  encodeUtf16(data) {
    var result = '';
    for (var i = 0; i < data.length; i++) {
      var hex = data.charCodeAt(i).toString(16);
      result += ('000' + hex).slice(-4);
    }
    return result
  }

}

export default HexEncode;
