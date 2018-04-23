import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

/**
 * Removes unicode whitespace characters (WSpace=Y) as listed here: https://en.wikipedia.org/wiki/Whitespace_character
 */
class StripWhiteSpace extends Step {

  static title = 'Strip White Space';
  static supports = [ StringType ];

  calculate(input) {
    // eslint-disable-next-line no-control-regex
    return Data.string(input.data.replace(/[\x09-\x0d\x20\x85\xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/g, ''));
  }

}

export default StripWhiteSpace;
