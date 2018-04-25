import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <h1 className="logo"><span>string-o-matic</span></h1>
        <nav>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/guide" activeClassName="active">Guide</NavLink>
          <NavLink to="/about" activeClassName="active">About</NavLink>
          <a className="reset" onClick={this.props.reset}><span className="ion-ios-close-circle-outline"/> Reset</a>
        </nav>
      </header>
    );
  }

}

Header.propTypes = {
  reset: PropTypes.func.isRequired
};

export default Header;
