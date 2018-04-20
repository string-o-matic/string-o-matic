import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component {

  render() {
    return (
      <div>
        <div className="notfound">
          <h1><span className="ion-md-alert"/><br/>404</h1>
          <p>
            <strong>Page not found</strong>
          </p>
          <p>
            <Link to="/">Sorry about that! Try our homepage instead.</Link>
          </p>
        </div>
      </div>
    );
  }

}

export default NotFound;
