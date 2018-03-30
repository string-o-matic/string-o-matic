import React, { Component } from 'react';
import {BCryptHashForm} from './hash/BCryptHash';
import './StepForm.css';

class StepForm extends Component {

  components = {
    'BCryptHash': BCryptHashForm
  };

  render() {
    const TagName = this.components[this.props.step.constructor.name];
    if (TagName) {
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