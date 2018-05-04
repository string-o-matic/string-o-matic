import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';
import HtmlUtils from '../../../lib/HtmlUtils';

class HtmlUnescape extends Step {

  static title = 'HTML Unescape';
  static variantTitle = 'Unescape';
  static supports = [ StringType ];
  static output = StringType;
  static rtl = true;

  calculate(input) {
    // Three-stage replacement: hex, decimal, named entities. Avoids check whether each match is numeric.
    return Data.string(input.data.replace(/&#x([0-9a-fA-F]+);/g, (match, entity) => {
      try {
        return this.utf16SurrogatePair(parseInt(entity, 16));
      } catch (e) { /* ignore */ }
      return match;
    }).replace(/&#(\d+);/g, (match, entity) => {
      try {
        return this.utf16SurrogatePair(parseInt(entity, 10));
      } catch (e) { /* ignore */ }
      return match;
    }).replace(/&([a-zA-Z]+);/g, (match, entity) => {
      if (HtmlUtils.entityToChar[entity]) {
        return HtmlUtils.entityToChar[entity];
      } else if (HtmlUtils.entityToChar[entity.toLowerCase()]) {
        return HtmlUtils.entityToChar[entity.toLowerCase()];
      } else {
        return match;
      }
    }));
  }

  utf16SurrogatePair(int) {
    if (int > 0xFFFF) {
      const hi = (Math.floor((int - 0x10000) / 0x400) + 0xD800);
      const lo = ((int - 0x10000) % 0x400 + 0xDC00);
      return String.fromCharCode(hi) + String.fromCharCode(lo);
    } else {
      return String.fromCharCode(int);
    }
  }

}

export default HtmlUnescape;
