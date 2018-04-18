import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {

  render() {
    let version = document.head.querySelector('[name=version]').content;
    if (version.startsWith('%')) {
      version = 'DEVELOPMENT BUILD';
    }
    return (
      <div>
        <div className="about">
          <h1>string-o-matic</h1>
          <div className="version">
            {version}
          </div>
          <div className="author">
            &copy;2018 <a href="http://www.davemorrissey.com/" rel="noopener noreferrer">Dave Morrissey</a>
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
        </div>
      </div>
    );
  }

}

export default About;
