import LowerCase from './LowerCase';
import Data from '../../Data';
import {StringType} from '../../Types';

let step = new LowerCase();

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
  expectResult('LOREM $^&* IPSUM', 'lorem $^&* ipsum');
});

test('mixed case ascii string', () => {
  expectResult('Dolor \r\n SIT Amet -=()!@<>', 'dolor \r\n sit amet -=()!@<>');
});

test('upper case ascii string', () => {
  expectResult(' _consectetur adipiscing ,./;"', ' _consectetur adipiscing ,./;"');
});

test('mixed characters', () => {
  expectResult('£ĀӨ抾ⓇকĘ', '£āө抾ⓡকę');
});

