import React from 'react';
import ReactDOM from 'react-dom';
import { StepTop, StepTail } from './Common';

it('renders top without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StepTop />, div);
});

it('renders tail crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StepTail />, div);
});