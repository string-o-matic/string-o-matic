import Step from './Step'

class HexStep extends Step {

  static title = 'Hex';
  static consumes = ['ByteStringBuffer'];
  static produces = { 'ByteStringBuffer': 'String' };

  calculate(input) {
    // TODO Check input type, this only supports a forge ByteStringBuffer
    if (input == null || input.data == null) {
      return { type: 'String', data: null };
    }
    return { type: 'String', data: input.data.toHex() };
  }

}

export default HexStep;
