import * as util from 'node-forge/lib/util';
import bcrypt from 'bcryptjs';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step';

class BCryptHashForm extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    var formGroupClass = this.props.step.costValid ? '' : ' has-error';
    return (
      <form className="form-inline row">
        <div className="help col-xs-12">
          Enter a cost between {this.props.step.minCost} and {this.props.step.maxCost}. BCrypt supports up to 31, but this site is limited to {this.props.step.maxCost}.
        </div>
        <div className={'material-group col-xs-12 col-sm-3 col-md-2' + formGroupClass}>
          <label>Cost</label>
          <input type="number" min={this.props.step.minCost} max={this.props.step.maxCost} maxLength="2" value={this.props.step.cost} onChange={this.onChange}/>
        </div>
      </form>
    );
  }

  onChange(e) {
    this.props.step.setCost(parseInt(e.target.value, 10));
    this.props.refresh();
  }

}

// https://github.com/dcodeIO/bcrypt.js/
// TODO fail if crypto.getRandomValues is unavailable, later implement fallback
class BCryptHash extends Step {

  static title = 'BCrypt Hash';
  static variantTitle = 'Hash';
  static supports = [ StringType ];
  static output = StringType;
  static form = BCryptHashForm;

  cost = 12;
  costValid = true;
  minCost = 4;
  maxCost = 16;

  setCost(cost) {
    if (isNaN(cost)) {
      cost = '';
    }
    this.output = null;
    this.cost = cost;
    this.passInput();
  }

  // TODO This has to copy sequence and context to the output, which should be done by the Step class.
  calculate(input) {
    const cost = parseInt(this.cost, 10);
    this.costValid = cost && cost >= this.minCost && cost <= this.maxCost;
    if (!this.costValid) {
      return Data.invalid('Please enter a cost between ' + this.minCost + ' and ' + this.maxCost);
    }
    return new Promise(resolve => {
      bcrypt.genSalt(cost).then(salt => {
        bcrypt.hash(input.data, salt).then(hash => {
          const result = Data.string(hash).withSequence(input.sequence);
          if (util.encodeUtf8(input.data).length > 72) {
            result.addWarning('Input exceeds 72 bytes. Only the first 72 bytes are hashed.');
          }
          result.context = Object.assign(result.context, input.context);
          resolve(result);
        }, error => {
          this.error('hash error', error);
          resolve(Data.bug());
        });
      }, error => {
        this.error('genSalt error', error);
        resolve(Data.bug());
      });
    });
  }

}

BCryptHashForm.propTypes = {
  step: PropTypes.instanceOf(BCryptHash).isRequired,
  refresh: PropTypes.func.isRequired
};

export {BCryptHashForm};
export default BCryptHash;
