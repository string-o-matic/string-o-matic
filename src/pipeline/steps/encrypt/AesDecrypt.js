import * as cipher from 'node-forge/lib/cipher';
import Aes from './Aes';
import Data from '../../Data';

class AesDecrypt extends Aes {

  static title = 'AES Decrypt';
  static variantTitle = 'Decrypt';

  allowRandomKey = false;
  allowRandomIv = false;

  _calculate(cipherConf, key, iv, input) {
    const aes = cipher.createDecipher(cipherConf.ref, key.copy());
    aes.start({iv: iv.copy()});
    aes.update(input);
    const result = aes.finish();
    if (!result) {
      return Data.invalid('Decryption failed! This probably means your key is incorrect.');
    } else {
      return Data
        .byteStringBuffer(aes.output)
        .addInfo('Cipher: AES \u00a0 Key Size: ' + cipherConf.size + ' \u00a0 Mode: ' + cipherConf.mode + ' \u00a0 Padding: PKCS#7');
    }
  }

}

export default AesDecrypt;
