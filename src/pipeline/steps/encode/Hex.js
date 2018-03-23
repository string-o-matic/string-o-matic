import Step from '../Step'

class Hex extends Step {

  static title = 'Hex';

  calculate(input) {
    // TODO Support directly hashing a string
    // TODO Check input type, this only supports a forge ByteStringBuffer
    if (input == null || input.data == null) {
      return { type: 'String', data: null };
    }
    return { type: 'String', data: input.data.toHex() };
  }

}

export default Hex;
