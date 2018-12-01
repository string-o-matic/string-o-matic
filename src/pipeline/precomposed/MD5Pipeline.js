import React  from 'react';
import Pipeline from '../Pipeline';
import MD5 from '../steps/hash/MD5';
import HexEncode from '../steps/encode/HexEncode';
import Globals from '../../Globals';
/* globals document */

class MD5Pipeline extends Pipeline {

  componentDidMount() {
    super.componentDidMount();
    document.title = 'MD5 Hash @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>MD5 Hash</h1>
        <p>
          This page computes the MD5 hash of text or files.
        </p>
        <ol>
          <li>
            Enter your text in the <strong>Input</strong> box, or upload a file.
          </li>
          <li>
            Normally you&apos;ll want to hash some plain text, and that&apos;s the default. You can select the character
            encoding used to convert the text into bytes for the MD5 algorithm. UTF-8 is usually best.
          </li>
          <li>
            If the text you&apos;ve entered is actually base64, hex, decimal or binary encoded bytes, simply select
            the appropriate input type in the <strong>MD5</strong> box.
          </li>
          <li>
            The hash result will be shown in the <strong>MD5</strong> box as a hex string.
          </li>
          <li>
            We&apos;ve added a <strong>Hex Encode</strong> step. This converts the bytes output by the MD5 algorithm into
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
    this.addStep(new MD5());
    this.addStep(new HexEncode());
  }
  
}

export default MD5Pipeline;