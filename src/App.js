import React, { Component } from 'react';
import './App.css';
import Pipeline from './pipeline/Pipeline';
import AesEncryptPipeline from './pipeline/precomposed/AesEncryptPipeline';
import AesDecryptPipeline from './pipeline/precomposed/AesDecryptPipeline';
import MD5Pipeline from './pipeline/precomposed/MD5Pipeline';
import SHA1Pipeline from './pipeline/precomposed/SHA1Pipeline';
import SHA256Pipeline from './pipeline/precomposed/SHA256Pipeline';
import BCryptHashPipeline from './pipeline/precomposed/BCryptHashPipeline';
import HtmlEscapePipeline from './pipeline/precomposed/HtmlEscapePipeline';
import HtmlUnescapePipeline from './pipeline/precomposed/HtmlUnescapePipeline';
import UpperCasePipeline from './pipeline/precomposed/UpperCasePipeline';
import LowerCasePipeline from './pipeline/precomposed/LowerCasePipeline';
import TitleCasePipeline from './pipeline/precomposed/TitleCasePipeline';
import HexEncodePipeline from './pipeline/precomposed/HexEncodePipeline';
import DecimalEncodePipeline from './pipeline/precomposed/DecimalEncodePipeline';
import BinaryEncodePipeline from './pipeline/precomposed/BinaryEncodePipeline';
import Base64EncodePipeline from './pipeline/precomposed/Base64EncodePipeline';
import HexDecodePipeline from './pipeline/precomposed/HexDecodePipeline';
import DecimalDecodePipeline from './pipeline/precomposed/DecimalDecodePipeline';
import BinaryDecodePipeline from './pipeline/precomposed/BinaryDecodePipeline';
import Base64DecodePipeline from './pipeline/precomposed/Base64DecodePipeline';
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
              <PageRoute path="/aes-decrypt" component={AesDecryptPipeline} resetPipeline={true} />
              <PageRoute path="/md5" component={MD5Pipeline} resetPipeline={true} />
              <PageRoute path="/sha1" component={SHA1Pipeline} resetPipeline={true} />
              <PageRoute path="/sha256" component={SHA256Pipeline} resetPipeline={true} />
              <PageRoute path="/bcrypt" component={BCryptHashPipeline} resetPipeline={true} />
              <PageRoute path="/html-escape" component={HtmlEscapePipeline} resetPipeline={true} />
              <PageRoute path="/html-unescape" component={HtmlUnescapePipeline} resetPipeline={true} />
              <PageRoute path="/upper-case" component={UpperCasePipeline} resetPipeline={true} />
              <PageRoute path="/lower-case" component={LowerCasePipeline} resetPipeline={true} />
              <PageRoute path="/title-case" component={TitleCasePipeline} resetPipeline={true} />
              <PageRoute path="/hex-encode" component={HexEncodePipeline} resetPipeline={true} />
              <PageRoute path="/decimal-encode" component={DecimalEncodePipeline} resetPipeline={true} />
              <PageRoute path="/binary-encode" component={BinaryEncodePipeline} resetPipeline={true} />
              <PageRoute path="/base64-encode" component={Base64EncodePipeline} resetPipeline={true} />
              <PageRoute path="/hex-decode" component={HexDecodePipeline} resetPipeline={true} />
              <PageRoute path="/decimal-decode" component={DecimalDecodePipeline} resetPipeline={true} />
              <PageRoute path="/binary-decode" component={BinaryDecodePipeline} resetPipeline={true} />
              <PageRoute path="/base64-decode" component={Base64DecodePipeline} resetPipeline={true} />
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
