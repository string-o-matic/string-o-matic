import * as util from 'node-forge/lib/util';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class Base64Decode extends Step {

  static title = 'Base64 Decode';
  static supports = [ StringType ];

  calculate(input) {
    const result = util.decodeUtf8(util.decode64(input.data));
    return Data.string(result);
  }

}

export default Base64Decode;
