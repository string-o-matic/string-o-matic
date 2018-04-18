import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {

  render() {
    let version = document.head.querySelector('[name=version]').content;
    if (version.startsWith('%')) {
      version = 'DEVELOPMENT BUILD';
    }
    return (
      <div className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <h4>Links</h4>
              <div className="row">
                <div className="col-xs-6">
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/guide">Guide</Link></li>
                    <li><Link to="/about">About</Link></li>
                  </ul>
                </div>
                <div className="col-xs-6">
                  <ul>
                    <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <h4>About</h4>
              <div className="row">
                <div className="col-xs-6">
                  <strong>string-o-matic</strong>
                  <br/>
                  {version}
                  <br/>
                  &copy;2018
                </div>
                <div className="col-xs-6">
                  <span className="ion-md-contact"/> <a href="http://www.davemorrissey.com/" target="_blank" rel="noopener noreferrer">Dave Morrissey</a>
                  <br/>
                  <a href="https://github.com/string-o-matic" target="_blank" rel="noopener noreferrer"><span className="ion-logo-github"/> View source on GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Footer;
