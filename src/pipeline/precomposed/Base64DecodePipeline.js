import React  from 'react';
import Pipeline from '../Pipeline';
import Base64Decode from '../steps/encode/Base64Decode';
import Globals from '../../Globals';
/* globals document */

class Base64DecodePipeline extends Pipeline {

  componentDidMount() {
    document.title = 'Base64 Decode @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Base64 Decode</h1>
        <p>
          This page converts base64 to bytes and then to plain text. It handles the standard and URL-safe variants of
          base64, and allows you to select the character encoding that was used. If you want to decode base64 that
          represents bytes (for example an encryption key), try the Text &rarr; Bytes step in base64 mode instead.
        </p>
        <p>
          Note this is not a strict base64 decoder. It will simply strip any characters from your input that are not
          part of the base64 alphabet, add missing padding, and decode what&apos;s left. The result may be garbled.
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    Globals.textInput = 'TGlmZSBpcyBsaWtlIGEg8J+TpiBvZiDwn42r';
    this.addStep(new Base64Decode());
  }
  
}

export default Base64DecodePipeline;