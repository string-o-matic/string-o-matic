import React  from 'react';
import Pipeline from '../Pipeline';
import AesDecrypt from '../steps/encrypt/AesDecrypt';
import BytesToText from '../steps/convert/BytesToText';
import Globals from '../../Globals';
/* global document */

class AesDecryptPipeline extends Pipeline {

  componentDidMount() {
    document.title = 'AES Decrypt @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>AES Decrypt</h1>
        <p>
          This page decrypts text or files using AES 128, 192 or 256, in CBC mode with PKCS#7 padding. You need to enter
          the key and IV used to encrypt the value, as hex or base64.
        </p>
        <ol>
          <li>
            Enter your encrypted text in the <strong>Input</strong> box, or upload a file. Text can be base64, hex,
            decimal or binary encoded bytes.
          </li>
          <li>
            You&apos;ll be asked how your text should be converted to bytes. Select whether it is base64, hex etc.
          </li>
          <li>
            The encrypted result will be shown in the <strong>AES Decrypt</strong> box as a hex string.
          </li>
          <li>
            We&apos;ve assumed your input was encrypted text and added a <strong>Bytes &rarr; Text</strong> step to
            convert the decrypted bytes back into text. You can change the character encoding or swap this for
            another conversion step.
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
    Globals.textInput = '5yYZ9VBFi5CNAH956h72vA5gbOjuh+Tguz+3RvINI7s=';
    const aes = new AesDecrypt();
    aes.prefs.source = 'b64';
    aes.prefs.keyType = 'b64';
    aes.prefs.key = 'L607PGqPKRFnKpog4WbjUg==';
    aes.prefs.ivType = 'b64';
    aes.prefs.iv = 'vXZOfrLCCeAuEJRwyJtLkg==';
    this.addStep(aes);
    this.addStep(new BytesToText());
  }
  
}

export default AesDecryptPipeline;