import UnicodeDecode from './UnicodeDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new UnicodeDecode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty hex', () => {
  expectResult('', '');
});

test('empty dec', () => {
  step.setStyle('dec');
  expectResult('', '');
});

test('hex padded various characters', () => {
  expectResult('U+0061 U+00E0 U+0394 U+0419 U+05E7 U+0645 U+0E57 U+3042 U+53F6 U+8449 U+B9D0 U+1F9DD', 'aàΔЙקم๗あ叶葉말🧝');
});

test('hex unpadded various characters', () => {
  expectResult('U+61 U+E0 U+394 U+419 U+5E7 U+645 U+E57 U+3042 U+53F6 U+8449 U+B9D0 U+1F9DD', 'aàΔЙקم๗あ叶葉말🧝');
});

test('dec various characters', () => {
  step.setStyle('dec');
  expectResult('97 224 916 1049 1511 1605 3671 12354 21494 33865 47568 129501', 'aàΔЙקم๗あ叶葉말🧝');
});


test('no separator', () => {
  expectResult('U+0061U+00E0U+0394U+0419U+05E7U+0645U+0E57U+3042U+53F6U+8449U+B9D0U+1F9DD', 'aàΔЙקم๗あ叶葉말🧝');
});

test('line length 2', () => {
  expectResult('U+0061 U+00E0\nU+0394 U+0419\nU+05E7 U+0645\nU+0E57 U+3042\nU+53F6 U+8449\nU+B9D0 U+1F9DD', 'aàΔЙקم๗あ叶葉말🧝');
});

test('x prefix', () => {
  expectResult('x0061 x00E0 x0394 x0419 x05E7 x0645 x0E57 x3042 x53F6 x8449 xB9D0 x1F9DD', 'aàΔЙקم๗あ叶葉말🧝');
});

test('; suffix', () => {
  expectResult('U+0061; U+00E0; U+0394; U+0419; U+05E7; U+0645; U+0E57; U+3042; U+53F6; U+8449; U+B9D0; U+1F9DD;', 'aàΔЙקم๗あ叶葉말🧝');
});

test('lowercase', () => {
  expectResult('U+0061 U+00e0 U+0394 U+0419 U+05e7 U+0645 U+0e57 U+3042 U+53f6 U+8449 U+b9d0 U+1f9dd', 'aàΔЙקم๗あ叶葉말🧝');
});

test('combined options', () => {
  expectResult('0x0061;|0x00e0;\n0x0394;|0x0419;\n0x05e7;|0x0645;\n0x0e57;|0x3042;\n0x53f6;|0x8449;\n0xb9d0;|0x1f9dd;', 'aàΔЙקم๗あ叶葉말🧝');
});
