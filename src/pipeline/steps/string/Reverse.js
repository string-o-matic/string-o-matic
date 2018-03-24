import Step from '../Step';
import Data from '../../Data';

class Reverse extends Step {

  static title = 'Reverse';

  calculate(input) {
    if (input == null || input.data == null) {
      return Data.nul();
    } else {
      return Data.string(input.data.split("").reverse().join(""));
    }
  }

}

export default Reverse;
