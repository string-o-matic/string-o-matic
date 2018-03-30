import URIEncode from './URIEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new URIEncode();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
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
  expectResult('a b', 'a%20b');
});

test('+', () => {
  expectResult('a+b', 'a%2Bb');
});

test('special', () => {
  expectResult('a : b / c < " d = e & f', 'a%20%3A%20b%20%2F%20c%20%3C%20%22%20d%20%3D%20e%20%26%20f');
});

