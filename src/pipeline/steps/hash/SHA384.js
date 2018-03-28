import * as forge from 'node-forge'
import Step from '../Step'
import Data from '../../Data';
import {StringType} from '../../Types';

class SHA384 extends Step {

  static title = 'SHA-384';
  static supports = [ StringType ];

  sha384 = forge.md.sha384.create();

  calculate(input) {
    this.sha384.start();
    this.sha384.update(input.data);
    return Data.byteStringBuffer(this.sha384.digest());
  }

}

export default SHA384;
