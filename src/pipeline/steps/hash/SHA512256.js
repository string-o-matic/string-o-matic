import * as sha512 from 'node-forge/lib/sha512';
import Hash from './Hash';

class SHA512256 extends Hash {

  static title = 'SHA-512/256';

  constructor() {
    super(sha512.sha256.create());
  }

}

export default SHA512256;
