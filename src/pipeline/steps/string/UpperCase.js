import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class UpperCase extends Step {

  static title = 'Uppercase';
  static supports = [ StringType ];

  calculate(input) {
    return Data.string(input.data.toUpperCase());
  }

}

export default UpperCase;
