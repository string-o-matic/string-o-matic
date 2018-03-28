import * as forge from 'node-forge'
import Hash from './Hash'

class MD5 extends Hash {

  static title = 'MD5';

  constructor() {
    super(forge.md5.create());
  }

}

export default MD5;
