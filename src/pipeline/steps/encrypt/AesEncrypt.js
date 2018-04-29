import * as cipher from 'node-forge/lib/cipher';
import Aes from './Aes';
import Data from '../../Data';

class AesEncrypt extends Aes {

  static title = 'AES Encrypt';
  static variantTitle = 'Encrypt';

  _calculate(cipherConf, key, iv, input) {
    const aes = cipher.createCipher(cipherConf.ref, key.copy());
    aes.start({iv: iv.copy()});
    aes.update(input);
    aes.finish();
    return Data
      .byteStringBuffer(aes.output)
      .addInfo('Cipher: AES \u00a0 Key Size: ' + cipherConf.size + ' \u00a0 Mode: ' + cipherConf.mode + ' \u00a0 Padding: PKCS#7')
      .addContext('aes.encrypt.key', key.copy())
      .addContext('aes.encrypt.iv', iv.copy());
  }

}

export default AesEncrypt;
