import React, { Component } from 'react';
import MD5 from './steps/hash/MD5';
import SHA1 from './steps/hash/SHA1';
import SHA256 from './steps/hash/SHA256';
import SHA384 from './steps/hash/SHA384';
import SHA512 from './steps/hash/SHA512';
import SHA512224 from './steps/hash/SHA512224';
import SHA512256 from './steps/hash/SHA512256';
import BCryptHash from './steps/hash/BCryptHash';
import Hex from './steps/encode/Hex';
import URIEncode from './steps/encode/URIEncode';
import Reverse from './steps/string/Reverse';
import UpperCase from './steps/string/UpperCase';
import LowerCase from './steps/string/LowerCase';
import AsyncTest from './steps/AsyncTest';
import { StepTop } from '../Common';
import './StepSelector.css';

class StepSelector extends Component {

  categories = {
    string: [ UpperCase, LowerCase, Reverse, AsyncTest ],
    encode: [ URIEncode, Hex ],
    hash: [ BCryptHash, MD5, SHA1, SHA256, SHA384, SHA512, SHA512224, SHA512256 ],
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
