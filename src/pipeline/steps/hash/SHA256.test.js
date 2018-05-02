import SHA256 from './SHA256';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const step = new SHA256();
  step.setInput(Data.string(input));
  const result = step.getOutput();
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('empty', () => {
  expectResult('', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
});

test('example1', () => {
  expectResult('The quick brown fox jumps over the lazy dog', 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592');
});

test('heart', () => {
  expectResult('❤️', '16e81418a36c58995e00aeb9c261c9ef7fb739b37c72351f511dc3b3a89e5962');
});
