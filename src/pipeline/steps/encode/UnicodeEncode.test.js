import UnicodeEncode from './UnicodeEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new UnicodeEncode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty hex padded', () => {
  step.setStyle('hex-padded');
  expectResult('', '');
});

test('empty hex unpadded', () => {
  step.setStyle('hex-unpadded');
  expectResult('', '');
});

test('empty dec', () => {
  step.setStyle('dec');
  expectResult('', '');
});

test('hex padded various characters', () => {
  step.setStyle('hex-padded');
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'U+0061 U+00E0 U+0394 U+0419 U+05E7 U+0645 U+0E57 U+3042 U+53F6 U+8449 U+B9D0 U+1F9DD');
});

test('hex unpadded various characters', () => {
  step.setStyle('hex-unpadded');
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'U+61 U+E0 U+394 U+419 U+5E7 U+645 U+E57 U+3042 U+53F6 U+8449 U+B9D0 U+1F9DD');
});

test('dec various characters', () => {
  step.setStyle('dec');
  step.setPrefix('');
  expectResult('aàΔЙקم๗あ叶葉말🧝', '97 224 916 1049 1511 1605 3671 12354 21494 33865 47568 129501');
});


test('no separator', () => {
  step.setSeparator('');
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'U+0061U+00E0U+0394U+0419U+05E7U+0645U+0E57U+3042U+53F6U+8449U+B9D0U+1F9DD');
});

test('line length 2', () => {
  step.setCharsPerLine(2);
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'U+0061 U+00E0\nU+0394 U+0419\nU+05E7 U+0645\nU+0E57 U+3042\nU+53F6 U+8449\nU+B9D0 U+1F9DD');
});

test('x prefix', () => {
  step.setPrefix('x');
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'x0061 x00E0 x0394 x0419 x05E7 x0645 x0E57 x3042 x53F6 x8449 xB9D0 x1F9DD');
});

test('; suffix', () => {
  step.setSuffix(';');
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'U+0061; U+00E0; U+0394; U+0419; U+05E7; U+0645; U+0E57; U+3042; U+53F6; U+8449; U+B9D0; U+1F9DD;');
});

test('lowercase', () => {
  step.setCase('lower');
  expectResult('aàΔЙקم๗あ叶葉말🧝', 'U+0061 U+00e0 U+0394 U+0419 U+05e7 U+0645 U+0e57 U+3042 U+53f6 U+8449 U+b9d0 U+1f9dd');
});

test('combined options', () => {
  step.setPrefix('0x');
  step.setSuffix(';');
  step.setSeparator('|');
  step.setCharsPerLine(2);
  step.setCase('lower');
  expectResult('aàΔЙקم๗あ叶葉말🧝', '0x0061;|0x00e0;\n0x0394;|0x0419;\n0x05e7;|0x0645;\n0x0e57;|0x3042;\n0x53f6;|0x8449;\n0xb9d0;|0x1f9dd;');
});
