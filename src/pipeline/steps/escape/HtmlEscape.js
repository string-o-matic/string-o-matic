import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class HtmlEscape extends Step {

  static title = 'HTML Escape';
  static supports = [ StringType ];

  calculate(input) {
    return Data.string(input.data
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'));
  }

}

export default HtmlEscape;
