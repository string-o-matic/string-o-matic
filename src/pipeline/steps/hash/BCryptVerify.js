import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
import {StringType, BoolType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';
import PropTypes from 'prop-types';

class BCryptVerifyForm extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <form className="form-inline row">
        <div className="help col-xs-12">
          Enter a BCrypt hash as input, then enter a password to test against it here.
        </div>
        <div className="material-group col-xs-12">
          <label>Password</label>
          <input type="text" value={this.props.step.password} onChange={this.onChange}/>
        </div>
      </form>
    );
  }

  onChange(e) {
    this.props.step.setPassword(e.target.value);
    this.props.refresh();
  }

}

// https://github.com/dcodeIO/bcrypt.js/
class BCryptVerify extends Step {

  static title = 'BCrypt Verify';
  static variantTitle = 'Verify';
  static supports = [ StringType ];
  static output = BoolType;
  static form = BCryptVerifyForm;

  password = '';

  setPassword(password) {
    this.output = null;
    this.password = password;
    this.passInput();
  }

  calculate(input) {
    return new Promise(resolve => {
      bcrypt.compare(this.password, input.data).then(success => {
        resolve(Data.bool(success));
      }, error => {
        this.error('compare error', error);
        resolve(Data.bug());
      });
    });
  }

}

BCryptVerifyForm.propTypes = {
  step: PropTypes.instanceOf(BCryptVerify).isRequired,
  refresh: PropTypes.func.isRequired
};

export {BCryptVerifyForm};
export default BCryptVerify;
