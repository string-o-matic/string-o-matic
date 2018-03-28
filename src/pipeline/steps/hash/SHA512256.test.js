import SHA512256 from './SHA512256';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

var step = new SHA512256();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', 'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d');
});
