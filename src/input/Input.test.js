import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import Data from '../pipeline/Data';

it('renders without crashing', () => {
  var initialInput = Data.string('wobbly wombat');
  const div = document.createElement('div');
  ReactDOM.render(<Input initialInput={initialInput}/>, div);
});