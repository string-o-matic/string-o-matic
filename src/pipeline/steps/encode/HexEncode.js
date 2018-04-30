import AbstractByteEncode from './AbstractByteEncode';

class HexEncode extends AbstractByteEncode {

  static title = 'Hex Encode';

  base = 'hex';
  showCase = true;

}

export default HexEncode;
