import Base64Encode from './Base64Encode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step;

beforeEach(() => {
  step = new Base64Encode();
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
  expectResult('f', 'Zg==');
});

test('fo', () => {
  expectResult('fo', 'Zm8=');
});

test('foo', () => {
  expectResult('foo', 'Zm9v');
});

test('foobar', () => {
  expectResult('foobar', 'Zm9vYmFy');
});
