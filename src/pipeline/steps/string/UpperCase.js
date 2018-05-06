import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class UpperCase extends Step {

  static title = 'Upper Case';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;

  calculate(input) {
    return Data.string(input.data.toUpperCase());
  }

}

export default UpperCase;
