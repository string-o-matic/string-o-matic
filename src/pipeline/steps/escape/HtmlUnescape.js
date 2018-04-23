import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class HtmlUnescape extends Step {

  static title = 'HTML Unescape';
  static supports = [ StringType ];

  calculate(input) {
    return Data.string(input.data
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&apos;/g, '\'')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&'));
  }

}

export default HtmlUnescape;
