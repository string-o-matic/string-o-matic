import * as forge from 'node-forge'
import Step from '../Step'
import Data from '../../Data';

class MD5 extends Step {

  static title = 'MD5';

  md5 = forge.md5.create();

  calculate(input) {
    // TODO Check input type
    if (input == null || input.data == null) {
      return Data.nul();
    }
    this.md5.start();
    this.md5.update(input.data);
    return Data.byteStringBuffer(this.md5.digest());
  }

}

export default MD5;
