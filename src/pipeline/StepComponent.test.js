import React from 'react';
import ReactDOM from 'react-dom';
import UpperCase from './steps/string/UpperCase';
import StepComponent from './StepComponent';

it('renders without crashing', () => {
  const step = new UpperCase();
  const div = document.createElement('div');
  const refresh = function() { };
  const deleteStep = function() { };
  const injectStepBefore = function() { };
  ReactDOM.render(<StepComponent step={step} refresh={refresh} deleteStep={deleteStep} injectStepBefore={injectStepBefore}/>, div);
});