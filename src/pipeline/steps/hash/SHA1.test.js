import SHA1 from './SHA1';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

var step = new SHA1();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
});

test('example2', () => {
  expectResult('The quick brown fox jumps over the lazy cog', 'de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3');
});

test('empty', () => {
  expectResult('', 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
});

test('heart', () => {
  expectResult('❤️', 'e12823a8cf9ab652e19c6181fae07470d633593d');
});
