import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

/**
 * Removes unprintable control characters. Although tab, CR and LF are control characters, they are printable and not
 * removed. A regex replace step will provide more flexibility.
 */
class StripControlCharacters extends Step {

  static title = 'Strip Control Characters';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;

  calculate(input) {
    // eslint-disable-next-line no-control-regex
    return Data.string(input.data.replace(/[^\x09\x0a\x0d\x20-\x7e\xa0-\xac\xae-\xff\u00ff-\uffff]/g, ''));
  }

}

export default StripControlCharacters;
