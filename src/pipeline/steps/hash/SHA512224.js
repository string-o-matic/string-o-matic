import * as sha512 from 'node-forge/lib/sha512';
import Hash from './Hash';

class SHA512224 extends Hash {

  static title = 'SHA-512/224';

  constructor() {
    super(sha512.sha224.create());
  }

}

export default SHA512224;
