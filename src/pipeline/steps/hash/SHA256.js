import * as forge from 'node-forge'
import Hash from './Hash';

class SHA256 extends Hash {

  static title = 'SHA-256';

  constructor() {
    super(forge.md.sha256.create());
  }

}

export default SHA256;
