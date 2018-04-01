import * as sha512 from 'node-forge/lib/sha512';
import Hash from './Hash';

class SHA512 extends Hash {

  static title = 'SHA-512';

  constructor() {
    super(sha512.create());
  }

}

export default SHA512;
