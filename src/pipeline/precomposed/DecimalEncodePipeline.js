import React  from 'react';
import Pipeline from '../Pipeline';
import DecimalEncode from '../steps/encode/DecimalEncode';

class DecimalEncodePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Decimal Encode</h1>
        <p>
          This page converts text to bytes, then encodes the bytes as decimal. For example the letter <code>a</code> becomes <code>97</code> in UTF-8.
          Note this is not the same as HTML escaping with decimal entities (see the HTML Escape step).
        </p>
        <p>
          You can select the character encoding you want. This affects how characters are represented as
          bytes - <code>a</code> is <code>0 97</code> in UTF-16 big-endian and <code>97 0</code> in UTF-16 little-endian.
          You can also customise the output, adding a prefix or suffix for each byte and choosing the number
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
    this.addStep(new DecimalEncode());
  }
  
}

export default DecimalEncodePipeline;