import React from 'react';
import ReactDOM from 'react-dom';
import Pipeline from './Pipeline';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pipeline/>, div);
});