import Base64EDecode from './Base64Decode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step;

beforeEach(() => {
  step = new Base64EDecode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty', () => {
  expectResult('', '');
});

test('f', () => {
  expectResult('Zg==', 'f');
});

test('fo', () => {
  expectResult('Zm8=', 'fo');
});

test('foo', () => {
  expectResult('Zm9v', 'foo');
});

test('foobar', () => {
  expectResult('Zm9vYmFy', 'foobar');
});

test('lines ignored', () => {
  expectResult('Z\nm9v\nYm\nFy', 'foobar');
});