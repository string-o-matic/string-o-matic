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

test('empty', () => {
  expectResult('', 'c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a');
});

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', 'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d');
});

test('heart', () => {
  expectResult('❤️', '74aea5ecf1ff70649ed3385ebd8eb431a75f4c2c69aae17ac540a11850ee6eba');
});
