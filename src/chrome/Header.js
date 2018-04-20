import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header>
        <h1 className="logo"><span>string-o-matic</span></h1>
        <nav>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/guide" activeClassName="active">Guide</NavLink>
          <NavLink to="/about" activeClassName="active">About</NavLink>
        </nav>
      </header>
    );
  }

}

export default Header;
