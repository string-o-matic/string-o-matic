import Step from '../Step';
import Data from '../../Data';

class Hex extends Step {

  static title = 'Hex';

  calculate(input) {
    // TODO Support directly hashing a string
    // TODO Check input type, this only supports a forge ByteStringBuffer
    if (input == null || input.data == null) {
      return Data.nul();
    }
    return Data.string(input.data.toHex());
  }

}

export default Hex;
