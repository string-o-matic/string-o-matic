import React, { Component } from 'react';
import './App.css';
import * as forge from 'node-forge'

class App extends Component {

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
        <header>
          <h1>string-o-matic</h1>
          <h2>Because the world needs another string tools site</h2>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="step step-input">
                <h4>Input</h4>
                <textarea
                  className="code"
                  type="text"
                  value={this.state.string}
                  onChange={this.handleChange}
                  rows="4"
                  placeholder="Type here">
                </textarea>
                <div className="result-info">{this.state.string.length} characters</div>
                <div className="step-tail">
                  <div className="step-tail-1"></div>
                  <div className="step-tail-2"></div>
                </div>
              </div>
              <div className="step step-transform">
                <div className="step-top">
                  <div className="step-top-1"></div>
                </div>
                <h4>MD5</h4>
                <div className="result-info">{digest.length()} bytes</div>
                <div>(No preview)</div>
                <div className="step-tail">
                  <div className="step-tail-1"></div>
                  <div className="step-tail-2"></div>
                </div>
              </div>
              <div className="step step-transform">
                <div className="step-top">
                  <div className="step-top-1"></div>
                </div>
                <h4>Bytes to hex</h4>
                <div className="result-info">String, {hex.length} characters</div>
                <code>{hex}</code>
                <div className="step-tail">
                  <div className="step-tail-1"></div>
                  <div className="step-tail-2"></div>
                </div>
              </div>
              <div className="step step-transform">
                <div className="step-top">
                  <div className="step-top-1"></div>
                </div>
                <h4>Reverse</h4>
                <div className="result-info">String, {hex.length} characters</div>
                <code>{reverse}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ string: e.target.value });
  }
}

export default App;
