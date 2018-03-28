import SHA512224 from './SHA512224';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

var step = new SHA512224();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37');
});
