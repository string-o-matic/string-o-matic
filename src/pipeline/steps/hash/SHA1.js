import * as sha1 from 'node-forge/lib/sha1';
import Hash from './Hash';

class SHA1 extends Hash {

  static title = 'SHA-1';

  constructor() {
    super(sha1.create());
  }

}

export default SHA1;
