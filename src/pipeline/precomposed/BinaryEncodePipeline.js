import React  from 'react';
import Pipeline from '../Pipeline';
import BinaryEncode from '../steps/encode/BinaryEncode';
import Globals from '../../Globals';
/* globals document */

class BinaryEncodePipeline extends Pipeline {

  componentDidMount() {
    super.componentDidMount();
    document.title = 'Binary Encode @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Binary Encode</h1>
        <p>
          This page converts text to bytes, then encodes the bytes as binary. For example the letter <code>a</code> becomes <code>01100001</code> in UTF-8.
        </p>
        <p>
          You can select the character encoding you want. This affects how characters are represented as
          bytes - <code>a</code> is <code>00000000 01100001</code> in UTF-16 big-endian and <code>01100001 00000000</code> in UTF-16 little-endian.
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
    this.addStep(new BinaryEncode());
  }
  
}

export default BinaryEncodePipeline;