import React  from 'react';
import Pipeline from '../Pipeline';
import BinaryDecode from '../steps/encode/BinaryDecode';
import Globals from '../../Globals';


class BinaryDecodePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Binary Decode</h1>
        <p>
          This page converts binary to bytes and then to plain text. It allows you to select the character encoding that
          was used. If you want to decode binary that represents bytes (for example an encryption key), try the
          Text &rarr; Bytes step in binary mode instead.
        </p>
        <p>
          Note this is not a strict binary decoder. It will simply strip any characters other than 0 and 1 from your input
          and decode what&apos;s left. The result may be garbled.
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    Globals.textInput = '01001100 01101001 01100110 01100101 00100000 01101001 01110011 00100000 01101100 01101001 01101011 01100101 00100000 01100001 00100000 11110000 10011111 10010011 10100110 00100000 01101111 01100110 00100000 11110000 10011111 10001101 10101011';
    this.addStep(new BinaryDecode());
  }
  
}

export default BinaryDecodePipeline;