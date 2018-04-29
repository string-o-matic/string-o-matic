import React, { Component } from 'react';
import './App.css';
import Pipeline from './pipeline/Pipeline';
import AesEncryptPipeline from './pipeline/precomposed/AesEncryptPipeline';
import About from './pages/About';
import Guide from './pages/Guide';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Header from './chrome/Header';
import Footer from './chrome/Footer';
import Globals from './Globals';
import PageRoute from './PageRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <Router>
        <div>
          <Header reset={this.reset}/>
          <div className="content">
            <Switch>
              <PageRoute exact path="/" component={Pipeline} />
              <PageRoute path="/guide" component={Guide} />
              <PageRoute path="/about" component={About} />
              <PageRoute path="/terms" component={Terms} />
              <PageRoute path="/privacy" component={Privacy} />
              <PageRoute path="/aes-encrypt" component={AesEncryptPipeline} resetPipeline={true} />
              <PageRoute component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }

  reset() {
    Globals.reset();
    this.setState({});
  }

}

export default App;
