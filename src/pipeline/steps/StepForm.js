import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './Step';
import './StepForm.css';

class StepForm extends Component {

  render() {
    const step = this.props.step;
    const convertStep = step.convertStep;
    const refresh = this.props.refresh;
    const ConvertTagName = convertStep && convertStep.constructor.form;
    const TagName = step.constructor.form;
    if (TagName || ConvertTagName) {
      const convertRefresh = () => {
        step._update();
        refresh();
      };
      const convertForm = ConvertTagName ? (<ConvertTagName key="convert-form" step={convertStep} refresh={convertRefresh}/>) : null;
      const form = TagName ? (<TagName key="form" step={step} refresh={refresh}/>) : null;
      return (
        <div className="step-form container-fluid">
          {convertForm}
          {form}
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