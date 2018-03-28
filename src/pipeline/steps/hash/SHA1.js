import * as forge from 'node-forge'
import Hash from './Hash';

class SHA1 extends Hash {

  static title = 'SHA-1';

  constructor() {
    super(forge.md.sha1.create());
  }

}

export default SHA1;
