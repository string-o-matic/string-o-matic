import React, { Component } from 'react';
import './App.css';
import Pipeline from './pipeline/Pipeline';
import About from './About';
import Help from './Help';
import Privacy from './Privacy';
import Header from './chrome/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Pipeline} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Route path="/privacy" component={Privacy} />
        </div>
      </Router>
    );
  }

}

export default App;
