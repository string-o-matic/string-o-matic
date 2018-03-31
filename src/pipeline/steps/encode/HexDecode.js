import * as forge from 'node-forge';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class HexDecode extends Step {

  static title = 'Hex Decode';
  static supports = [ StringType ];

  calculate(input) {
    // FIXME decoding an MD5 sum causes an exception. Fix or catch.
    if (Globals.ENCODING === 'UTF-8') {
      const utf8 = forge.util.decodeUtf8(forge.util.hexToBytes(input.data));
      return Data.string(utf8);
    } else {
      const utf16 = this.decodeUtf16(input.data);
      return Data.string(utf16);
    }
  }

  decodeUtf16(data) {
    var hexes = data.match(/.{1,4}/g) || [];
    var result = '';
    for (var i = 0; i < hexes.length; i++) {
      result += String.fromCharCode(parseInt(hexes[i], 16));
    }
    return result;
  }

}

export default HexDecode;
