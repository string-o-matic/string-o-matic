import React  from 'react';
import Pipeline from '../Pipeline';
import DecimalDecode from '../steps/encode/DecimalDecode';
import Globals from '../../Globals';


class DecimalDecodePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Decimal Decode</h1>
        <p>
          This page converts decimal to bytes and then to plain text. It allows you to select the character encoding that
          was used. If you want to decode decimal that represents bytes (for example an encryption key), try the
          Text &rarr; Bytes step in decimal mode instead.
        </p>
        <p>
          Note this is not a strict decimal decoder. It will simply strip any characters other than 0-9 from your input
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
    Globals.textInput = '76 105 102 101 32 105 115 32 108 105 107 101 32 97 32 240 159 147 166 32 111 102 32 240 159 141 171';
    this.addStep(new DecimalDecode());
  }
  
}

export default DecimalDecodePipeline;