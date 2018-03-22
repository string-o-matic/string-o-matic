import Step from './Step'

class HexStep extends Step {

  title() {
    return 'To Hex';
  }

  consumes() {
    return ['ByteStringBuffer'];
  }

  produces() {
    return { 'ByteStringBuffer': 'String' }
  }

  getOutput() {
    console.log('hex get output', this.input);

    // TODO Check input type, this only supports a forge ByteStringBuffer
    if (this.input == null || this.input.data == null) {
      return { type: 'String', data: null };
    }
    return { type: 'String', data: this.input.data.toHex() };
  }

}

export default HexStep;
