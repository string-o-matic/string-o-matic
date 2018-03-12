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

  render() {
    var md5 = forge.md5.create();
    md5.update(this.state.string);
    var digest = md5.digest().toHex();

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">string-o-matic</h1>
        </header>
        <p className="App-intro">
          Yet another string tools website.
        </p>
        <h1>MD5</h1>
        <div>
          <input
            type="text"
            value={this.state.string}
            onChange={this.handleChange}
            placeholder="Type here" />
        </div>
        <code>{digest}</code>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ string: e.target.value });
  }
}

export default App;
