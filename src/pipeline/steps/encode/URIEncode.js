import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class URIEncode extends Step {

  static title = 'URI Encode';
  static supports = [ StringType ];

  calculate(input) {
    return Data.string(encodeURIComponent(input.data));
  }

}

export default URIEncode;
