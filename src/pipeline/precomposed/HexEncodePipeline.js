import React  from 'react';
import Pipeline from '../Pipeline';
import HexEncode from '../steps/encode/HexEncode';

class HexEncodePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Hex Encode</h1>
        <p>
          This page converts text to bytes, then encodes the bytes as hex. For example the letter <code>a</code> becomes <code>61</code> in UTF-8.
          Note this is not the same as HTML escaping with hex entities (see the HTML Escape step).
        </p>
        <p>
          You can select the character encoding you want. This affects how characters are represented as
          bytes - <code>a</code> is <code>00 61</code> in UTF-16 big-endian and <code>61 00</code> in UTF-16 little-endian.
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
    this.addStep(new HexEncode());
  }
  
}

export default HexEncodePipeline;