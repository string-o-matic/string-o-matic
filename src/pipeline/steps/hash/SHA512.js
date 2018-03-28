import * as forge from 'node-forge'
import Hash from './Hash';

class SHA512 extends Hash {

  static title = 'SHA-512';

  constructor() {
    super(forge.md.sha512.create());
  }

}

export default SHA512;
