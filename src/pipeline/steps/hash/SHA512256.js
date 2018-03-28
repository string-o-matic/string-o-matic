import * as forge from 'node-forge'
import Hash from './Hash';

class SHA512256 extends Hash {

  static title = 'SHA-512/256';

  constructor() {
    super(forge.md.sha512.sha256.create());
  }

}

export default SHA512256;
