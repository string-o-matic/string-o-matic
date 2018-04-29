import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Globals from './Globals';
/* global window */

class PageRoute extends Component {

  // Clear the pipeline when forward navigating to a precomposed page, but not when visiting home or pressing back to
  // return to a precomposed page.
  componentWillUpdate(newProps) {
    if (newProps.path === newProps.location.pathname &&
      newProps.location.pathname !== this.props.location.pathname &&
      newProps.history &&
      newProps.history.action === 'PUSH' &&
      newProps.resetPipeline) {
      Globals.steps = [];
    }
  }

  // Scroll to top after moving to a new page
  componentDidUpdate(prevProps) {
    if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} render={props => (<Component {...props} />)} />;
  }
}

PageRoute.propTypes = {
  path: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  resetPipeline: PropTypes.bool
};

export default withRouter(PageRoute);