import * as util from 'node-forge/lib/util';
import React, { Component } from 'react';
import {StringType} from '../../Types';
import Data from '../../Data';
import Step from '../Step'

// https://github.com/dcodeIO/bcrypt.js/
// TODO fail if crypto.getRandomValues is unavailable, later implement fallback
class BCryptHash extends Step {

  static title = 'BCrypt Hash';
  static supports = [ StringType ];

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

  calculate(input) {
    const cost = parseInt(this.cost, 10);
    this.costValid = cost && cost >= this.minCost && cost <= this.maxCost;
    if (!this.costValid) {
      return Data.invalid('Please enter a cost between ' + this.minCost + ' and ' + this.maxCost);
    }
    return new Promise(resolve => {
      window.dcodeIO.bcrypt.genSalt(cost).then(salt => {
        window.dcodeIO.bcrypt.hash(input.data, salt).then(hash => {
          const result = Data.string(hash);
          if (util.encodeUtf8(input.data).length > 72) {
            result.addWarning('Input exceeds 72 bytes. Only the first 72 bytes are hashed.');
          }
          resolve(result);
        }, error => {
          this.error('hash error', error);
          resolve(Data.bug());
        })
      }, error => {
        this.error('genSalt error', error);
        resolve(Data.bug());
      });
    });
  }

}

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
        <div className={"form-group col-xs-12 col-sm-4 col-md-3" + formGroupClass}>
          <div className="input-group">
            <div className="input-group-addon">Cost</div>
            <input type="number" min={this.props.step.minCost} max={this.props.step.maxCost} className="form-control"  value={this.props.step.cost} onChange={this.onChange}/>
          </div>
        </div>
      </form>
    );
  }

  onChange(e) {
    this.props.step.setCost(parseInt(e.target.value, 10));
    this.props.refresh();
  }

}

export {BCryptHashForm};
export default BCryptHash;
