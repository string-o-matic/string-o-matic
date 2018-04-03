import * as md5 from 'node-forge/lib/md5';
import Hash from './Hash';

class MD5 extends Hash {

  static title = 'MD5';

  constructor() {
    super(md5.create());
  }

}

export default MD5;
