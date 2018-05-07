import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const inputChange = function() { };
  ReactDOM.render(<Input initialInput="wobbly wombat" inputChange={inputChange}/>, div);
});