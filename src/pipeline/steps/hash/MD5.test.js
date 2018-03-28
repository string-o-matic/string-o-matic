import MD5 from './MD5';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

var step = new MD5();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', '9e107d9d372bb6826bd81d3542a419d6');
});

test('example2', () => {
  expectResult('The quick brown fox jumps over the lazy dog.', 'e4d909c290d0fb1ca068ffaddf22cbd0');
});

test('empty', () => {
  expectResult('', 'd41d8cd98f00b204e9800998ecf8427e');
});
