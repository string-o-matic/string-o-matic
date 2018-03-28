import * as forge from 'node-forge'
import Hash from './Hash';

class SHA384 extends Hash {

  static title = 'SHA-384';

  constructor() {
    super(forge.md.sha384.create());
  }

}

export default SHA384;
