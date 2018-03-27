import Step from '../Step';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

class Hex extends Step {

  static title = 'Hex';
  static supports = [ ByteStringBufferType ];

  calculate(input) {
    // TODO Support directly hashing a string
    return Data.string(input.data.toHex());
  }

}

export default Hex;
