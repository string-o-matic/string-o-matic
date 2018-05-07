import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';

/**
 * Prints every character in the range 0 to 255 to test how the browser displays each.
 */
class Iso88591Test extends Step {

  static title = 'ISO-8859-1 Test';
  static supports = [ StringType ];

  calculate() {
    let string = '';
    for (let int = 0; int < 256; int++) {
      const char = String.fromCharCode(int);
      let displayChar = '\ufffd';
      if (int === 9 || int === 10 || int === 13 || (int >= 32 && int <= 126) || (int >= 160 && int <= 172) || int >= 174) {
        displayChar = char;
      }
      string += int + ':\'' + char + '\' -> \'' + displayChar + '\'\n';
    }
    return Data.string(string);
  }

}

export default Iso88591Test;
