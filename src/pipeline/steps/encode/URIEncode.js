import Step from '../Step';
import Data from '../../Data';
import {StringType} from '../../Types';

class URIEncode extends Step {

  static title = 'URI Encode';
  static variantTitle = 'Encode';
  static supports = [ StringType ];
  static output = StringType;

  calculate(input) {
    return Data.string(encodeURIComponent(input.data));
  }

}

export default URIEncode;
