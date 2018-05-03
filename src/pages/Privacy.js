import React, { Component } from 'react';
import Globals from '../Globals';
/* global document */

class Privacy extends Component {

  componentDidMount() {
    document.title = 'Privacy @ ' + Globals.title;
  }

  render() {
    return (
      <div className="page">
        <h1>Privacy policy</h1>
        <p>
          Your privacy and security are very important. This site does not collect or store any personally identifiable
          information about you besides your IP address, and does not include any analytics tools that would allow a
          third party to track your visit. Nothing is stored in cookies or local storage in your browser.
        </p>
        <p>
          This site does not prevent you entering personally identifiable or commercially sensitive information in a
          text field. However, nothing you enter is sent to the site&apos;s server or to any third party. It is only
          held in your browser&apos;s memory until you clear it or leave the site.
        </p>
        <p>
          There is no guarantee that this site is secure. It is your responsibility to avoid entering private or
          sensitive information, and to keep your browser and operating system up-to-date.
        </p>
        <p>
          Your IP address and the pages you visit will be recorded in our logs for the purposes of unique visitor
          counting and monitoring the volume and sources of traffic on our site. Your IP address will never be shared
          with any third party.
        </p>
      </div>
    );
  }

}

export default Privacy;
