import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class LowerCase extends Step {

  static title = 'Lower Case';
  static supports = [ StringType ];
  static rtl = true;

  calculate(input) {
    return Data.string(input.data.toLowerCase());
  }

}

export default LowerCase;
