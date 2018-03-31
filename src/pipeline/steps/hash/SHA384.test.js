import SHA384 from './SHA384';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

var step = new SHA384();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('empty', () => {
  expectResult('', '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b');
});

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', 'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1');
});

test('heart', () => {
  expectResult('❤️', '5f0983b37fe2a8eedb0c85e83c1659d1bcf7b55a45dd9b0df70848901c27aae81b2dd0d25089011eb1518ec593938a6a');
});
