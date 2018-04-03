import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header>
        <h1>string<span className="ion-ios-cog"/>matic</h1>
        <h2>do things with strings</h2>
      </header>
    );
  }

}

export default Header;
