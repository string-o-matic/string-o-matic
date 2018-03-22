import React, { Component } from 'react';
import './App.css';
import Pipeline from './pipeline/Pipeline'

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <h1>string<span className="ion-ios-cog-outline"/>matic</h1>
          <h2>do things with strings</h2>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Pipeline/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
