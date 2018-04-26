import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import './StepForm.css';

class StepForm extends Component {

  render() {
    const TagName = this.props.step.constructor.form;
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

StepForm.propTypes = {
  step: PropTypes.instanceOf(Step).isRequired,
  refresh: PropTypes.func.isRequired
};

export default StepForm;