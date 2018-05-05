import SHA512 from './SHA512';
import Data from '../../Data';
import {ByteArrayType} from '../../Types';
import ByteUtils from '../../../lib/ByteUtils';


// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const step = new SHA512();
  step.setInput(Data.string(input));
  const result = step.getOutput();
  expect(result.type).toBe(ByteArrayType);
  expect(ByteUtils.uint8ArrayToBaseString(result.data, 'hex')).toBe(output);
}

test('empty', () => {
  expectResult('', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
});

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6');
});

test('heart', () => {
  expectResult('❤️', 'e45a96310802d153dca12570249ef5cb66b1d5c58e0bf78324bf3d40b7649108778ea9d30760b6839b7a2f0185d6ee98e028c7372aeef03c96fe3c50a058cce4');
});

