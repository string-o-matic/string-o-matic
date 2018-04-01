import * as util from 'node-forge/lib/util';
import Globals from '../../../Globals';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class HexDecode extends Step {

  static title = 'Hex Decode';
  static supports = [ StringType ];

  calculate(input) {
    // FIXME decoding an MD5 sum causes an exception. Fix or catch.
    var result = '';
    switch (Globals.ENCODING) {
      case 'UTF-8':
        result = util.decodeUtf8(util.hexToBytes(input.data));
        break;
      case 'UTF-16':
        result = this.decodeUtf16(input.data);
        break;
      default:
        result = util.hexToBytes(input.data);
        break;
    }
    return Data.string(result);
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
