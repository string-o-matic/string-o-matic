import AbstractByteDecode from './AbstractByteDecode';

class HexDecode extends AbstractByteDecode {

  static title = 'Hex Decode';
  static variantTitle = 'Decode';

  base = 16;

}

export default HexDecode;
