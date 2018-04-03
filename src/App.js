import React, { Component } from 'react';
import './App.css';
import Header from './chrome/Header';
import Pipeline from './pipeline/Pipeline';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Pipeline/>
      </div>
    );
  }

}

export default App;
