import React  from 'react';
import Pipeline from '../Pipeline';
import TitleCase from '../steps/string/TitleCase';

class TitleCasePipeline extends Pipeline {

  precomposedIntro() {
    return (
      <div className="intro">
        <h1>Title Case</h1>
        <p>
          This page converts text to title case. Simply enter your text in the <strong>Input</strong> box or upload a
          file, and the result will be shown in the <strong>Title Case</strong> box.
        </p>
        <p>
          string-o-matic.com allows you to build up a string transformation from composable steps and format the output
          however you like. Add or remove steps and change step settings to get the results you need!
        </p>
      </div>
    );
  }

  buildPrecomposedPipeline() {
    this.addStep(new TitleCase());
  }
  
}

export default TitleCasePipeline;