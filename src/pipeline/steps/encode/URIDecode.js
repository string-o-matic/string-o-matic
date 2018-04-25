import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class URIDecode extends Step {

  static title = 'URI Decode';
  static supports = [ StringType ];
  static rtl = true;

  direction = 'ltr';

  calculate(input) {
    return Data.string(decodeURIComponent(input.data));
  }

}

export default URIDecode;
