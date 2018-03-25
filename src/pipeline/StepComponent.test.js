import React from 'react';
import ReactDOM from 'react-dom';
import UpperCase from './steps/string/UpperCase';
import StepComponent from './StepComponent';

it('renders without crashing', () => {
  var step = new UpperCase();
  const div = document.createElement('div');
  ReactDOM.render(<StepComponent step={step}/>, div);
});