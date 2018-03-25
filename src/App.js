import React, { Component } from 'react';
import './App.css';
import Header from './chrome/Header'
import Pipeline from './pipeline/Pipeline'

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
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
