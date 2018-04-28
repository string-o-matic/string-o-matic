import * as cipher from 'node-forge/lib/cipher';
import Aes from './Aes';
import Data from '../../Data';

class AesEncrypt extends Aes {

  static title = 'AES Encrypt';
  static variantTitle = 'Encrypt';

  _calculate(cipherConf, key, iv, input) {
    const aes = cipher.createCipher(cipherConf.ref, key);
    aes.start({iv: iv});
    aes.update(input);
    aes.finish();
    return Data.byteStringBuffer(aes.output).addInfo('Cipher: AES, Key Size: ' + (cipherConf.size / 8) + ', Mode: ' + cipherConf.mode + ', IV: Random, Padding: PKCS#7');
  }

}

export default AesEncrypt;
