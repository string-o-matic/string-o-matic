import React  from 'react';
import Pipeline from '../Pipeline';
import HtmlEscape from '../steps/escape/HtmlEscape';
import Globals from '../../Globals';

class HtmlEscapePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>HTML Escape</h1>
        <p>
          This page escapes HTML reserved characters. The default is to escape only the minimum set of reserved
          characters - &lt;, &gt;, &quot;, &apos; and &amp;. This is enough provided you set the content
          encoding to UTF-8 in your headers.
        </p>
        <p>
          You can also choose to escape non-ASCII characters, or all characters. The latter has limited practical
          use besides obfuscation!
        </p>
        <ol>
          <li>
            Enter your text in the <strong>Input</strong> box, or upload a file.
          </li>
          <li>
            Choose which set of characters to escape and whether to use named entities, hex, decimal or a combination.
            You can also choose whether line endings should be preserved or turned into line breaks or paragraphs.
          </li>
          <li>
            The escaped text will be shown in the <strong>HTML Escape</strong> box.
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
    Globals.textInput = '"eight" is > 六 & < десять';
    this.addStep(new HtmlEscape());
  }
  
}

export default HtmlEscapePipeline;