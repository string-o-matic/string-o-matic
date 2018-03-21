import React, { Component } from 'react';
import * as forge from 'node-forge'

class Pipeline extends Component {

  defaultString = 'hello world';

  constructor(props) {
    super(props);
    this.state = { string: this.defaultString };
    this.handleChange = this.handleChange.bind(this);
  }

  reverseString(str) {
    return str.split("").reverse().join("");
  }

  render() {
    var md5 = forge.md5.create();
    md5.update(this.state.string);
    var digest = md5.digest();
    var hex = digest.toHex();
    var reverse = this.reverseString(hex);

    return (
      <div>
        <div className="step step-input">
          <div className="step-header">
            <h4>Input</h4>
          </div>
          <div className="step-body">
            <textarea
              className="code"
              type="text"
              value={this.state.string}
              onChange={this.handleChange}
              rows="4"
              placeholder="Type here">
            </textarea>
            <div className="result-info">{this.state.string.length} characters</div>
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

  handleChange(e) {
    this.setState({ string: e.target.value });
  }
}

export default Pipeline;
