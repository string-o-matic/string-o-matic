import * as util from 'node-forge/lib/util';
import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class Base64Encode extends Step {

  static title = 'Base64 Encode';
  static supports = [ StringType ];

  calculate(input) {
    const result = util.encode64(util.encodeUtf8(input.data));
    return Data.string(result);
  }

}

export default Base64Encode;
