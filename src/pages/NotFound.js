import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component {

  render() {
    return (
      <div>
        <div className="notfound">
          <h1><span className="ion-md-alert"/><br/>0b110010100 = 0x194 = 404 = PAGE_NOT_FOUND</h1>
          <p>
            <Link to="/">Sorry about that! Try our homepage instead.</Link>
          </p>
        </div>
      </div>
    );
  }

}

export default NotFound;
