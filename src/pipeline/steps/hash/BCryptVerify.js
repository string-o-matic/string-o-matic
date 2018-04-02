import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';

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
  static supports = [ StringType ];

  form = BCryptVerifyForm;
  password = '';

  setPassword(password) {
    this.output = null;
    this.password = password;
    this.passInput();
  }

  calculate(input) {
    return new Promise(resolve => {
      bcrypt.compare(this.password, input.data).then(success => {
        resolve(Data.bool(success))
      }, error => {
        this.error('compare error', error);
        resolve(Data.bug());
      });
    });
  }

}

export {BCryptVerifyForm};
export default BCryptVerify;
