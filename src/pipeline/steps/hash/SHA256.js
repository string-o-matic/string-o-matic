import * as forge from 'node-forge'
import Step from '../Step'
import Data from '../../Data';
import {StringType} from '../../Types';

class SHA256 extends Step {

  static title = 'SHA-256';
  static supports = [ StringType ];

  sha256 = forge.md.sha256.create();

  calculate(input) {
    this.sha256.start();
    this.sha256.update(input.data);
    return Data.byteStringBuffer(this.sha256.digest());
  }

}

export default SHA256;
