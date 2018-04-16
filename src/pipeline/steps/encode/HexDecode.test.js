import HexDecode from './HexDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new HexDecode();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('', '');
});

test('abc utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('616263', 'abc');
});

test('space utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('20', ' ');
});

test('pound utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('c2a3', '\u00A3');
});

test('dash emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('f09f92a8', '\uD83D\uDCA8');
});

test('heavy black heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('e29da4', '\u2764');
});

test('red heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('e29da4efb88f', '\u2764\uFE0F');
});

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('abc utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('006100620063', 'abc');
});

test('space utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('0020', ' ');
});

test('pound utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('00a3', '\u00A3');
});

test('dash emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('d83ddca8', '\uD83D\uDCA8');
});

test('heavy black heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('2764', '\u2764');
});

test('red heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('2764fe0f', '\u2764\uFE0F');
});


test('separate with spaces', () => {
  step.setEncoding('UTF-16');
  expectResult('27 64 fe 0f', '\u2764\uFE0F');
});

test('line length 2', () => {
  step.setEncoding('UTF-16');
  expectResult('2764\nfe0f', '\u2764\uFE0F');
});

test('x prefix', () => {
  step.setEncoding('UTF-16');
  expectResult('\\x27\\x64\\xfe\\x0f', '\u2764\uFE0F');
});

test('0x prefix', () => {
  step.setEncoding('UTF-16');
  expectResult('0x270x640xfe0x0f', '\u2764\uFE0F');
});

test('; suffix', () => {
  step.setEncoding('UTF-16');
  expectResult('27;64;fe;0f;', '\u2764\uFE0F');
});

test('uppercase', () => {
  step.setEncoding('UTF-16');
  expectResult('2764FE0F', '\u2764\uFE0F');
});

test('combined options', () => {
  step.setEncoding('UTF-16');
  expectResult('0x27;|0x64;\n0xFE;|0x0F;', '\u2764\uFE0F');
});

test('iso-8859-1', () => {
  step.setEncoding('ISO-8859-1');
  expectResult('c5d6', 'ÅÖ');
});