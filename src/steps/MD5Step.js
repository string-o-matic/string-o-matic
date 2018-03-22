import * as forge from 'node-forge'
import Step from './Step'

class MD5Step extends Step {

  title() {
    return 'MD5';
  }

  consumes() {
    return ['String'];
  }

  produces() {
    return { 'String': 'ByteStringBuffer' }
  }

  getOutput() {
    console.log('MD5 get output', this.input);
    // TODO Check input type
    if (this.input == null || this.input.data == null) {
      return { type: 'ByteStringBuffer', data: null };
    }
    var md5 = forge.md5.create();
    md5.update(this.input.data);
    return { type: 'ByteStringBuffer', data: md5.digest() };
  }

}

export default MD5Step;
