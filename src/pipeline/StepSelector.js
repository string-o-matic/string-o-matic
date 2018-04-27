import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MD5 from './steps/hash/MD5';
import SHA1 from './steps/hash/SHA1';
import SHA256 from './steps/hash/SHA256';
import SHA384 from './steps/hash/SHA384';
import SHA512 from './steps/hash/SHA512';
import SHA512224 from './steps/hash/SHA512224';
import SHA512256 from './steps/hash/SHA512256';
import BCryptHash from './steps/hash/BCryptHash';
import BCryptVerify from './steps/hash/BCryptVerify';
import HtmlEscape from './steps/escape/HtmlEscape';
import HtmlUnescape from './steps/escape/HtmlUnescape';
import HexEncode from './steps/encode/HexEncode';
import HexDecode from './steps/encode/HexDecode';
import Base64Encode from './steps/encode/Base64Encode';
import Base64Decode from './steps/encode/Base64Decode';
import BinaryEncode from './steps/encode/BinaryEncode';
import BinaryDecode from './steps/encode/BinaryDecode';
import URIEncode from './steps/encode/URIEncode';
import URIDecode from './steps/encode/URIDecode';
import Reverse from './steps/string/Reverse';
import UpperCase from './steps/string/UpperCase';
import LowerCase from './steps/string/LowerCase';
import StripControlCharacters from './steps/string/StripControlCharacters';
import StripWhiteSpace from './steps/string/StripWhiteSpace';
import AsyncTest from './steps/test/AsyncTest';
import Iso88591Test from './steps/test/Iso88591Test';
import { StepTop } from '../Common';
import './StepSelector.css';
/* global process */

class StepSelector extends Component {

  categories = {
    'String Case': [ UpperCase, LowerCase ], // Title, Snake, Camel, Inverse ...
    'String Transform': [ Reverse, StripControlCharacters, StripWhiteSpace ], // Replace, Normalize ...
    'Escape': [ HtmlEscape, HtmlUnescape ], // Java, Python ...
    'Character Encode': [ URIEncode, URIDecode ], // Code points decimal/hex
    'Byte Encode': [ HexEncode, HexDecode, Base64Encode, Base64Decode, BinaryEncode, BinaryDecode ],
    'Hash': [ BCryptHash, BCryptVerify, MD5, SHA1, SHA256, SHA384, SHA512, SHA512224, SHA512256 ],
    'Encrypt': [ ], // RSA ...
    'Cipher': [ ] // ROT13 ...
  };

  constructor(props) {
    super(props);
    this.state = {'filter': ''};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    if (process.env.NODE_ENV !== 'production') {
      this.categories['Tests'] = [ AsyncTest, Iso88591Test ];
    }
  }

  render() {
    let filteredCategories = { };
    Object.keys(this.categories).forEach(categoryName => {
      const category = this.categories[categoryName];
      category.forEach(step => {
        if (this.state.filter.length === 0 || step.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1) {
          if (!filteredCategories[categoryName]) {
            filteredCategories[categoryName] = [];
          }
          filteredCategories[categoryName].push(step);
        }
      });
    });
    let steps = <p className="no-matches">No matching steps!</p>;
    if (Object.keys(filteredCategories).length > 0) {
      steps = Object.keys(filteredCategories).map((name) => {
        return (<div key={name} className="category">
          <h4>{name}</h4>
          {
            filteredCategories[name].map((step, i) =>
              <button key={i} className="btn" onClick={this.addStep.bind(this, step)}>{step.title}</button>
            )
          }
        </div>);
      });
    }

    return (
      <div className="step-selector">
        <StepTop/>
        <div className="body">
          <div className="search">
            <input type="text" placeholder="Search" onChange={this.onSearchChange}/><button className="delete" onClick={this.clearSearch}><span className="ion-md-close"/></button>
          </div>
          {steps}
        </div>
      </div>
    );
  }

  onSearchChange(e) {
    this.setState({'filter': e.target.value});
  }

  clearSearch() {
    this.setState({'filter': ''});
  }

  addStep(step) {
    this.props.addStep(new step());
  }

}

StepSelector.propTypes = {
  addStep: PropTypes.func.isRequired
};

export default StepSelector;
