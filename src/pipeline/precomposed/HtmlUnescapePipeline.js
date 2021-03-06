import React  from 'react';
import Pipeline from '../Pipeline';
import HtmlUnescape from '../steps/escape/HtmlUnescape';
import Globals from '../../Globals';
import Data from '../Data';
/* globals document */

class HtmlUnescapePipeline extends Pipeline {

  constructor(props) {
    super(props);
    Globals.textInput = '&quot;eight&quot; is &gt; 六 &amp; &lt; десять';
    this.state = { input: Data.string(Globals.textInput) };
  }

  componentDidMount() {
    super.componentDidMount();
    document.title = 'HTML Unescape @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>HTML Unescape</h1>
        <p>
          This page unescapes HTML entities - named (e.g. <code>&amp;gt;</code>), hex (<code>&amp;#x3E;</code>) and
          decimal (<code>&amp;#62;</code>).
        </p>
        <ol>
          <li>
            Enter your escaped HTML in the <strong>Input</strong> box, or upload a file.
          </li>
          <li>
            You&apos;ll see the unescaped HTML in the <strong>HTML Unescape</strong> box.
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
    this.addStep(new HtmlUnescape());
  }
  
}

export default HtmlUnescapePipeline;