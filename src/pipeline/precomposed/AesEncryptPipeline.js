import React  from 'react';
import Pipeline from '../Pipeline';
import AesEncrypt from '../steps/encrypt/AesEncrypt';
import Base64Encode from '../steps/encode/Base64Encode';
import Globals from '../../Globals';
/* globals document */

class AesEncryptPipeline extends Pipeline {

  componentDidMount() {
    super.componentDidMount();
    document.title = 'AES Encrypt @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>AES Encrypt</h1>
        <p>
          This page encrypts text or files using AES 128, 192 or 256, in CBC mode. PKCS#7 padding is automatically
          added. You can enter your own key and IV, or use randomly generated ones. Never use the same IV twice!
        </p>
        <ol>
          <li>
            Enter your text in the <strong>Input</strong> box, or upload a file. Text can be base64, hex, decimal or
            binary encoded bytes, or plain text.
          </li>
          <li>
            You&apos;ll be asked how your text should be converted to bytes. For plain text you can select the character
            encoding. UTF-8 is usually best.
          </li>
          <li>
            The encrypted result will be shown in the <strong>AES Encrypt</strong> box as a hex string.
          </li>
          <li>
            We&apos;ve added a <strong>Base64 Encode</strong> step to convert the encrypted bytes. You can swap this
            for any other byte encode step - hex, decimal, binary etc.
          </li>
        </ol>
        <p>
          <strong>We can&apos;t guarantee the accuracy of the results or security of the settings.</strong>
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    const aes = new AesEncrypt();
    aes.generateIv();
    aes.generateKey();
    this.addStep(aes);
    this.addStep(new Base64Encode());
  }
  
}

export default AesEncryptPipeline;