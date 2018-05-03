import React  from 'react';
import Pipeline from '../Pipeline';
import SHA256 from '../steps/hash/SHA256';
import HexEncode from '../steps/encode/HexEncode';
import Globals from '../../Globals';
/* globals document */

class SHA256Pipeline extends Pipeline {

  componentDidMount() {
    document.title = 'SHA-256 Hash @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>SHA-256 Hash</h1>
        <p>
          This page computes the SHA-256 hash of text or files. SHA-256 is one of the SHA-2 family of hash functions.
        </p>
        <ol>
          <li>
            Enter your text in the <strong>Input</strong> box, or upload a file.
          </li>
          <li>
            Normally you&apos;ll want to hash some plain text, and that&apos;s the default. You can select the character
            encoding used to convert the text into bytes for the SHA-256 algorithm. UTF-8 is usually best.
          </li>
          <li>
            If the text you&apos;ve entered is actually base64, hex, decimal or binary encoded bytes, simply select
            the appropriate input type in the <strong>SHA-256</strong> box.
          </li>
          <li>
            The hash result will be shown in the <strong>SHA-256</strong> box as a hex string.
          </li>
          <li>
            We&apos;ve added a <strong>Hex Encode</strong> step. This converts the bytes output by the SHA-256 algorithm into
            hex, as you saw in the preview, but with a variety of options for formatting the hex. If you want to encode
            the hash as Base64 instead, you can swap this step for a <strong>Base64 Encode</strong> step.
          </li>
        </ol>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    this.addStep(new SHA256());
    this.addStep(new HexEncode());
  }
  
}

export default SHA256Pipeline;