import React, { Component } from 'react';
import MD5 from './steps/hash/MD5';
import Hex from './steps/encode/Hex';
import Reverse from './steps/string/Reverse';
import UpperCase from './steps/string/UpperCase';
import LowerCase from './steps/string/LowerCase';
import { StepTop } from '../Common';
import './StepSelector.css';

class StepSelector extends Component {

  categories = {
    string: [ UpperCase, LowerCase, Reverse ],
    encode: [ Hex ],
    hash: [ MD5 ],
    encrypt: [ ]
  };

  render() {

    return (
      <div className="step-selector">
        <StepTop/>
        <div className="body">
          {
            Object.keys(this.categories).map((name) => {
              return (<div key={name} className="category">
                <div className="category-body">
                  <h4>{name.toUpperCase()}</h4>
                  {
                    this.categories[name].map((step, i) =>
                      <button key={i} className="btn btn-block btn-sm"
                              onClick={this.addStep.bind(this, step)}>{step.title}</button>
                    )
                  }
                </div>
              </div>)
            })
          }
        </div>
      </div>
    );
  }

  addStep(step) {
    this.props.addStep(new step());
  }

}

export default StepSelector;
