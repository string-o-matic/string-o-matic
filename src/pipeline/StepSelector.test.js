import React from 'react';
import ReactDOM from 'react-dom';
import StepSelector from './StepSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const addStep = function() { };
  ReactDOM.render(<StepSelector addStep={addStep}/>, div);
});