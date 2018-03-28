import * as forge from 'node-forge'
import Step from '../Step'
import Data from '../../Data';
import {StringType} from '../../Types';

class SHA512 extends Step {

  static title = 'SHA-512';
  static supports = [ StringType ];

  sha512 = forge.md.sha512.create();

  calculate(input) {
    this.sha512.start();
    this.sha512.update(input.data);
    return Data.byteStringBuffer(this.sha512.digest());
  }

}

export default SHA512;
