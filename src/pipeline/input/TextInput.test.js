import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from './TextInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const inputChange = function() { };
  ReactDOM.render(<TextInput initialInput="wobbly wombat" inputChange={inputChange}/>, div);
});