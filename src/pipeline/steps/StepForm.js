import React, { Component } from 'react';
import {BCryptHashForm} from './hash/BCryptHash';
import {BCryptVerifyForm} from './hash/BCryptVerify';
import {HexEncodeForm} from './encode/HexEncode';
import './StepForm.css';

class StepForm extends Component {

  components = {
    'BCryptHash': BCryptHashForm,
    'BCryptVerify': BCryptVerifyForm,
    'HexEncode': HexEncodeForm
  };

  render() {
    const TagName = this.components[this.props.step.constructor.name];
    if (TagName && this.props.step.showForm !== false) {
      return (
        <div className="step-form container-fluid">
          <TagName key="form" step={this.props.step} refresh={this.props.refresh}/>
        </div>
      );
    } else {
      return null;
    }
  }

}
export default StepForm;