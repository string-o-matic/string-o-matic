import Step from '../Step'
import Data from '../../Data';
import {StringType} from '../../Types';

class Hash extends Step {

  static supports = [ StringType ];

  constructor(hash) {
    super();
    this.hash = hash;
  }

  calculate(input) {
    this.hash.start();
    this.hash.update(input.data);
    return Data.byteStringBuffer(this.hash.digest());
  }

}

export default Hash;
