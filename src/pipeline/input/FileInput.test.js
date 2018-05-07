import React from 'react';
import ReactDOM from 'react-dom';
import FileInput from './FileInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const inputChange = function() { };
  ReactDOM.render(<FileInput inputChange={inputChange}/>, div);
});