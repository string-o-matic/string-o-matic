import * as cipher from 'node-forge/lib/cipher';
import Aes from './Aes';
import Data from '../../Data';

class AesDecrypt extends Aes {

  static title = 'AES Decrypt';
  static variantTitle = 'Decrypt';

  allowRandomKey = false;
  allowRandomIv = false;

  _calculate(key, iv, input) {
    const aes = cipher.createDecipher('AES-' + this.prefs.mode, key.copy());
    aes.start({iv: iv.copy()});
    aes.update(input);
    const result = aes.finish();
    if (!result) {
      return Data.invalid('Decryption failed! Likely causes: incorrect key, corrupt input.');
    } else {
      return Data
        .byteStringBuffer(aes.output)
        .addInfo('Cipher: AES \u00a0 Key Size: ' + this.prefs.keySize + ' \u00a0 Mode: ' + this.prefs.mode + ' \u00a0 Padding: PKCS#7');
    }
  }

}

export default AesDecrypt;
