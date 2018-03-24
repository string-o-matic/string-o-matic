import Step from '../Step';
import Data from '../../Data';

class UpperCase extends Step {

  static title = 'Uppercase';

  calculate(input) {
    if (input == null || input.data == null) {
      return Data.nul();
    } else {
      return Data.string(input.data.toUpperCase());
    }
  }

}

export default UpperCase;
