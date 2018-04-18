import React, { Component } from 'react';

class Privacy extends Component {

  render() {
    return (
      <div className="page">
        <h4><span className="ion-ios-cog-outline"/> Terms and conditions</h4>
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
            You may use this site for any purpose, personal or commercial, provided your use:
            <ul>
              <li>is not in contravention of the laws of the United Kingdom or the country from which you are viewing the site</li>
              <li>does not infringe the rights or intellectual property of any individual or organization</li>
            </ul>
          </li>
        </ul>
        <h5>Privacy</h5>
        <p>
          The privacy policy forms part of these terms and conditions and you are strongly advised to read and understand
          it. The authors take all reasonable precautions to ensure your privacy and security, but accept no responsibility
          for any loss or damage that may occur from your use of this site.
        </p>
        <h4><span className="ion-ios-cog-outline"/> Privacy policy</h4>
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
