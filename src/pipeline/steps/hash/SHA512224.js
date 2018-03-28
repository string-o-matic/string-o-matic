import * as forge from 'node-forge'
import Hash from './Hash';

class SHA512224 extends Hash {

  static title = 'SHA-512/224';

  constructor() {
    super(forge.md.sha512.sha224.create());
  }

}

export default SHA512224;
