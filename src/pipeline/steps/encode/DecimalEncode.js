import AbstractByteEncode from './AbstractByteEncode';

class DecimalEncode extends AbstractByteEncode {

  constructor() {
    super();
    this.prefs.separator = ' ';
  }

  static title = 'Decimal Encode';

  base = 'dec';

}

export default DecimalEncode;
