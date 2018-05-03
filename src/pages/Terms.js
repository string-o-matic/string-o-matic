import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Globals from '../Globals';
/* global document */

class Terms extends Component {

  componentDidMount() {
    document.title = 'Terms @ ' + Globals.title;
  }

  render() {
    return (
      <div className="page">
        <h1>Terms and Conditions</h1>
        <p>
          By using this site you agree to the following terms and conditions.
        </p>
        <h5>No warranty</h5>
        <p>
          The authors will make every effort to ensure the calculations produce the correct results. However the following
          disclaimers apply.
        </p>
        <ul>
          <li>
            This site is made available with no guarantee of security.
          </li>
          <li>
            The data calculated by this site is presented with no guarantee of accuracy.
          </li>
        </ul>
        <h5>No liability</h5>
        <ul>
          <li>
            The authors of this site cannot be held responsible or liable for any loss or damage that may result from
            your use of it, for any reason.
          </li>
        </ul>
        <h5>Acceptable use</h5>
        <ul>
          <li>
            You may use this site for any purpose, personal or commercial, provided:
            <ul>
              <li>you do not contravene the laws of the United Kingdom or the country from which you are viewing the site</li>
              <li>you do not infringe the rights or intellectual property of any individual or organization</li>
            </ul>
          </li>
        </ul>
        <h5>Privacy</h5>
        <p>
          The <Link to="/privacy">privacy policy</Link> forms part of these terms and conditions and you are strongly
          advised to read and understand it. The authors take all reasonable precautions to ensure your privacy and
          security, but accept no responsibility for any loss or damage that may occur from your use of this site.
        </p>
      </div>
    );
  }

}

export default Terms;
