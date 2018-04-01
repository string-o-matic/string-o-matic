import * as sha512 from 'node-forge/lib/sha512';
import Hash from './Hash';

class SHA384 extends Hash {

  static title = 'SHA-384';

  constructor() {
    super(sha512.sha384.create());
  }

}

export default SHA384;
