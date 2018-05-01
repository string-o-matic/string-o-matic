import * as cipher from 'node-forge/lib/cipher';
import Aes from './Aes';
import Data from '../../Data';

class AesEncrypt extends Aes {

  static title = 'AES Encrypt';
  static variantTitle = 'Encrypt';

  _calculate(key, iv, input) {
    const aes = cipher.createCipher('AES-' + this.prefs.mode, key.byteStringBuffer.copy());
    aes.start({iv: iv.byteStringBuffer.copy()});
    aes.update(input);
    aes.finish();
    return Data
      .byteStringBuffer(aes.output)
      .addInfo('Cipher: AES \u00a0 Key Size: ' + this.prefs.keySize + ' \u00a0 Mode: ' + this.prefs.mode + ' \u00a0 Padding: PKCS#7')
      .addContext('aes.encrypt.key', key)
      .addContext('aes.encrypt.iv', iv);
  }

}

export default AesEncrypt;
