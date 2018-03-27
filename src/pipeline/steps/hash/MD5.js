import * as forge from 'node-forge'
import Step from '../Step'
import Data from '../../Data';
import {StringType} from '../../Types';

class MD5 extends Step {

  static title = 'MD5';
  static supports = [ StringType ];

  md5 = forge.md5.create();

  calculate(input) {
    this.md5.start();
    this.md5.update(input.data);
    return Data.byteStringBuffer(this.md5.digest());
  }

}

export default MD5;
