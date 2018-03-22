import * as forge from 'node-forge'
import Step from './Step'

class MD5Step extends Step {

  static title = 'MD5';
  static consumes = ['String'];
  static produces = { 'String': 'ByteStringBuffer' };

  md5 = forge.md5.create();

  calculate(input) {
    // TODO Check input type
    if (input == null || input.data == null) {
      return { type: 'ByteStringBuffer', data: null };
    }
    this.md5.start();
    this.md5.update(input.data);
    return { type: 'ByteStringBuffer', data: this.md5.digest() };
  }

}

export default MD5Step;
