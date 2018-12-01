import React  from 'react';
import Pipeline from '../Pipeline';
import UpperCase from '../steps/string/UpperCase';
import Globals from '../../Globals';
/* globals document */

class UpperCasePipeline extends Pipeline {

  componentDidMount() {
    super.componentDidMount();
    document.title = 'Upper Case @ ' + Globals.title;
  }

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Upper Case</h1>
        <p>
          This page converts text to upper case. Simply enter your text in the <strong>Input</strong> box or upload a
          file, and the result will be shown in the <strong>Upper Case</strong> box.
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    this.addStep(new UpperCase());
  }
  
}

export default UpperCasePipeline;