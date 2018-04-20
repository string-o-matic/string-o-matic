import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* global process */

class About extends Component {

  render() {
    let commit = null;
    let date = null;
    let year = '[YEAR]';
    let version = 'DEVELOPMENT BUILD';
    if (process && process.env) {
      commit = process.env.REACT_APP_COMMIT_NUMBER;
      date = process.env.REACT_APP_BUILD_DATE;
      year = process.env.REACT_APP_BUILD_YEAR || '[YEAR]';
      if (commit && date) {
        version = commit + ' / ' + date;
      }
    }
    return (
      <div>
        <div className="about">
          <h1>string-o-matic</h1>
          <div className="version">
            {version}
          </div>
          <div className="author">
            &copy; {year} <a href="http://www.davemorrissey.com/" target="_blank" rel="noopener noreferrer">Dave Morrissey</a>
          </div>
          <div className="github">
            <a href="https://github.com/string-o-matic" target="_blank" rel="noopener noreferrer"><span className="ion-logo-github"/><br/>View source on GitHub</a>
          </div>
        </div>
        <div className="page">
          <p>
            You may have used a variety of websites that allow you to hash, encrypt, encode, cipher or transform strings.
            Many of these sites have a single function on each page, don&apos;t update as you type, and don&apos;t give
            you any formatting options. Often it&apos;s necessary to use multiple sites to achieve simple goals like
            encrypting a string and encoding the result as hex.
          </p>
          <p>
            The goal of string-o-matic is to provide a variety of useful string transformation tools on a single page, with
            powerful output options and a modular design that allows you to compose a complex string transformation from a
            series of steps. This is called a pipeline, and it&apos;s the inspiration behind the name.
          </p>
          <p>
            This is an open source project available on GitHub at <a href="https://github.com/string-o-matic" rel="noopener noreferrer">https://github.com/string-o-matic</a>.
            Suggestions and pull requests from the developer community are very welcome.
          </p>
          <p>
            Please take a look at the <Link to="/terms">terms &amp; conditions</Link> and <Link to="/privacy">privacy policy</Link>.
          </p>
          <h4>Credits</h4>
          <p>
            This site could not have been built without the hard work of thousands of developers all over the world
            who have contributed to the open source community. Listed here are just a few.
          </p>
          <ul>
            <li>MD5, SHA, RSA, Hex and Base64 by Digital Bazaar - <a href="https://github.com/digitalbazaar/forge" target="_blank" rel="noopener noreferrer">digitalbazaar/forge</a></li>
            <li>BCrypt hashing by Daniel Wirtz (dcodeIO) and others - <a href="https://github.com/dcodeIO/bcrypt.js" target="_blank" rel="noopener noreferrer">dcodeIO/bcrypt.js</a></li>
            <li>React by Facebook - <a href="https://github.com/facebook/react/" target="_blank" rel="noopener noreferrer">facebook/react</a></li>
          </ul>
        </div>
      </div>
    );
  }

}

export default About;
