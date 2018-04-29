import React from 'react';
import ReactDOM from 'react-dom';
import Pipeline from './Pipeline';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Pipeline/></Router>, div);
});