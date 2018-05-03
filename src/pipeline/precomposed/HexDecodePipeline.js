import React  from 'react';
import Pipeline from '../Pipeline';
import HexDecode from '../steps/encode/HexDecode';
import Globals from '../../Globals';


class HexDecodePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Hex Decode</h1>
        <p>
          This page converts hex to bytes and then to plain text. It allows you to select the character encoding that
          was used. If you want to decode hex that represents bytes (for example an encryption key), try the
          Text &rarr; Bytes step in hex mode instead.
        </p>
        <p>
          Note this is not a strict hex decoder. It will simply strip any characters from your input that are not
          in the hex character set (0-9, A-F) and decode what&apos;s left. The result may be garbled.
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    Globals.textInput = '4c696665206973206c696b65206120f09f93a6206f6620f09f8dab';
    this.addStep(new HexDecode());
  }
  
}

export default HexDecodePipeline;