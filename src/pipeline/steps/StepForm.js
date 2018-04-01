import React, { Component } from 'react';
import './StepForm.css';

class StepForm extends Component {

  render() {
    const TagName = this.props.step.form;
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