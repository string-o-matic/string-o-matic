import * as forge from 'node-forge'
import Step from '../Step'
import Data from '../../Data';
import {StringType} from '../../Types';

class SHA1 extends Step {

  static title = 'SHA-1';
  static supports = [ StringType ];

  sha1 = forge.md.sha1.create();

  calculate(input) {
    this.sha1.start();
    this.sha1.update(input.data);
    return Data.byteStringBuffer(this.sha1.digest());
  }

}

export default SHA1;
