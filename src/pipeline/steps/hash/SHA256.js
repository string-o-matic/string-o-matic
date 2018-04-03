import * as sha256 from 'node-forge/lib/sha256';
import Hash from './Hash';

class SHA256 extends Hash {

  static title = 'SHA-256';

  constructor() {
    super(sha256.create());
  }

}

export default SHA256;
