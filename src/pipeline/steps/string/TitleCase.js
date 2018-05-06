import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class TitleCase extends Step {

  static title = 'Title Case';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;

  calculate(input) {
    // This pattern matches a lot more than it needs to but catches accented characters - \w would not.
    let result = input.data.replace(/(^|\s)[^\s]/g, (m) => m.toUpperCase());
    return Data.string(result);
  }

}

export default TitleCase;
