import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';

// https://github.com/dcodeIO/bcrypt.js/
class BCryptVerify extends Step {

  static title = 'BCrypt Verify';
  static supports = [ StringType ];

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
        <div className="form-group col-xs-12 col-sm-4 col-md-3">
          <div className="input-group">
            <div className="input-group-addon">Password</div>
            <input type="text" className="form-control"  value={this.props.step.password} onChange={this.onChange}/>
          </div>
        </div>
      </form>
    );
  }

  onChange(e) {
    this.props.step.setPassword(e.target.value);
    this.props.refresh();
  }

}

export {BCryptVerifyForm};
export default BCryptVerify;
