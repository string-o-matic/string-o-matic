import React, { Component } from 'react';
import './App.css';
import Pipeline from './pipeline/Pipeline';
import About from './pages/About';
import Guide from './pages/Guide';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Header from './chrome/Header';
import Footer from './chrome/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Pipeline} />
              <Route path="/guide" component={Guide} />
              <Route path="/about" component={About} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }

}

export default App;
