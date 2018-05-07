import URIDecode from './URIDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step = new URIDecode();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty', () => {
  expectResult('', '');
});

test('abc', () => {
  expectResult('abc', 'abc');
});

test('space', () => {
  expectResult('a%20b', 'a b');
});

test('+1', () => {
  expectResult('a+b', 'a+b');
});

test('+2', () => {
  expectResult('a%2Bb', 'a+b');
});

test('special', () => {
  expectResult('a%20%3A%20b%20%2F%20c%20%3C%20%22%20d%20%3D%20e%20%26%20f', 'a : b / c < " d = e & f');
});

