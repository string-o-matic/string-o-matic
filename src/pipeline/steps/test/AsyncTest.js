import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';

/**
 * A test step for async calculation. If the first character of the input string is a number, delays that
 * number of seconds, otherwise returns synchronously.
 */
class AsyncTest extends Step {

  static title = 'Async Test';
  static supports = [ StringType ];
  static rtl = true;

  direction = 'ltr';

  calculate(input) {
    const output = Data.string(input.data + ' (' + this.key + ')');
    if (input.data.length > 0) {
      const char = input.data.substring(0, 1);
      if (/[0-9]/.test(char)) {
        return new Promise(resolve => {
          const time = parseInt(char, 10) * 1000;
          setTimeout(_ => resolve(output), time);
        });
      } else {
        return output;
      }
    } else {
      return output;
    }
  }

}

export default AsyncTest;
