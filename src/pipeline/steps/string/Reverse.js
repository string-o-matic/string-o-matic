import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class Reverse extends Step {

  static title = 'Reverse';
  static supports = [ StringType ];

  calculate(input) {
    return Data.string(input.data.split('').reverse().join(''));
  }

}

export default Reverse;
