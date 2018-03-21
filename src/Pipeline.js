import React, { Component } from 'react';
import * as forge from 'node-forge'
import Input from './input/Input'

class Pipeline extends Component {

  initialInput = 'Grumpy wizards make toxic brew for the evil queen and jack';

  constructor(props) {
    super(props);
    this.state = { input: this.initialInput };
    this.inputChange = this.inputChange.bind(this);
  }

  reverseString(str) {
    return str.split("").reverse().join("");
  }

  render() {
    var string = this.state ? this.state.input : null;
    var hex = null;
    var reverse = null;
    var digest = null;
    if (string) {
      var md5 = forge.md5.create();
      md5.update(this.state.input);
      digest = md5.digest();
      hex = digest.toHex();
      reverse = this.reverseString(hex);
    }

    return (
      <div>
        <Input inputChange={this.inputChange} initialInput={this.initialInput}/>
        <div className="step step-transform">
          <div className="step-top">
            <div className="step-top-1"></div>
          </div>
          <div className="step-header">
            <h4>MD5</h4>
          </div>
          <div className="step-body">
            <div className="result-info">{digest.length()} bytes</div>
            <div>No preview available for byte array</div>
          </div>
          <div className="step-tail">
            <div className="step-tail-1"></div>
            <div className="step-tail-2"></div>
          </div>
        </div>
        <div className="step step-transform">
          <div className="step-top">
            <div className="step-top-1"></div>
          </div>
          <div className="step-header">
            <h4>To Hex</h4>
          </div>
          <div className="step-body">
            <div className="result-info">String, {hex.length} characters</div>
            <code>{hex}</code>
          </div>
          <div className="step-tail">
            <div className="step-tail-1"></div>
            <div className="step-tail-2"></div>
          </div>
        </div>
        <div className="step step-transform">
          <div className="step-top">
            <div className="step-top-1"></div>
          </div>
          <div className="step-header">
            <h4>Reverse string</h4>
          </div>
          <div className="step-body">
            <div className="result-info">String, {hex.length} characters</div>
            <code>{reverse}</code>
          </div>
        </div>
      </div>
    );
  }

  inputChange(input) {
    console.log('new input: ' + input);
    this.setState({ input: input });
  }
}

export default Pipeline;
