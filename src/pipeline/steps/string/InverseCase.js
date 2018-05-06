import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class InverseCase extends Step {

  static title = 'Inverse Case';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;

  calculate(input) {
    let result = '';
    for (let i = 0; i < input.data.length; i++) {
      let n = input.data.charAt(i);
      if (n === n.toUpperCase()) {
        n = n.toLowerCase();
      } else {
        n = n.toUpperCase();
      }
      result += n;
    }
    return Data.string(result);
  }

}

export default InverseCase;
