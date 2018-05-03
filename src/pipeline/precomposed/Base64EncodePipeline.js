import React  from 'react';
import Pipeline from '../Pipeline';
import Base64Encode from '../steps/encode/Base64Encode';

class Base64EncodePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Base64 Encode</h1>
        <p>
          This page converts text to bytes, then encodes the bytes as base64. For example <code>xyz</code> becomes <code>eHl6</code> in UTF-8.
        </p>
        <p>
          You can select the character encoding you want. This affects how characters are represented as
          bytes - <code>xyz</code> is <code>AHgAeQB6</code> in UTF-16 big-endian and <code>eAB5AHoA</code> in UTF-16 little-endian.
          You can also customise the output, selecting either the standard or URL-safe variant of base64 and choosing the number
          of bytes per line.
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    this.addStep(new Base64Encode());
  }
  
}

export default Base64EncodePipeline;