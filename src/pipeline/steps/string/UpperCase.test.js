import UpperCase from './UpperCase';
import Data from '../../Data';
import {StringType} from '../../Types';

let step = new UpperCase();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty', () => {
  expectResult('', '');
});

test('lower case ascii string', () => {
  expectResult('lorem $^&* ipsum', 'LOREM $^&* IPSUM');
});

test('mixed case ascii string', () => {
  expectResult('Dolor \r\n SIT Amet -=()!@<>', 'DOLOR \r\n SIT AMET -=()!@<>');
});

test('upper case ascii string', () => {
  expectResult(' _CONSECTETUR ADIPISCING ,./;"', ' _CONSECTETUR ADIPISCING ,./;"');
});

test('mixed characters', () => {
  expectResult('£āӨ抾Ⓡকę', '£ĀӨ抾ⓇকĘ');
});

