import HexEncode from './HexEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step;

beforeEach(() => {
  step = new HexEncode();
});

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
  expectResult('abc', '616263');
});

test('space utf8', () => {
  step.setEncoding('UTF-8');
  expectResult(' ', '20');
});

test('pound utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u00A3', 'c2a3');
});

test('dash emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\uD83D\uDCA8', 'f09f92a8');
});

test('heavy black heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u2764', 'e29da4');
});

test('red heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u2764\uFE0F', 'e29da4efb88f');
});

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('abc utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('abc', '006100620063');
});

test('space utf16', () => {
  step.setEncoding('UTF-16');
  expectResult(' ', '0020');
});

test('pound utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u00A3', '00a3');
});

test('pound utf16 bom', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  expectResult('\u00A3', 'feff00a3');
});

test('abc utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('abc', '610062006300');
});

test('space utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult(' ', '2000');
});

test('pound utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('\u00A3', 'a300');
});

test('pound utf16le bom', () => {
  step.setEncoding('UTF-16LE');
  step.setBom('1');
  expectResult('\u00A3', 'fffea300');
});

test('dash emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\uD83D\uDCA8', 'd83ddca8');
});

test('heavy black heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u2764', '2764');
});

test('red heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u2764\uFE0F', '2764fe0f');
});

test('red heart emoji utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('\u2764\uFE0F', '64270ffe');
});

test('separate with spaces', () => {
  step.setEncoding('UTF-16');
  step.setSeparator(' ');
  expectResult('\u2764\uFE0F', '27 64 fe 0f');
});

test('line length 2', () => {
  step.setEncoding('UTF-16');
  step.setBytesPerLine(2);
  expectResult('\u2764\uFE0F', '2764\nfe0f');
});

test('x prefix', () => {
  step.setEncoding('UTF-16');
  step.setPrefix('\\x');
  expectResult('\u2764\uFE0F', '\\x27\\x64\\xfe\\x0f');
});

test('; suffix', () => {
  step.setEncoding('UTF-16');
  step.setSuffix(';');
  expectResult('\u2764\uFE0F', '27;64;fe;0f;');
});

test('uppercase', () => {
  step.setEncoding('UTF-16');
  step.setCase('upper');
  expectResult('\u2764\uFE0F', '2764FE0F');
});

test('combined options', () => {
  step.setEncoding('UTF-16');
  step.setPrefix('0x');
  step.setSuffix(';');
  step.setSeparator('|');
  step.setBytesPerLine(2);
  step.setCase('upper');
  expectResult('\u2764\uFE0F', '0x27;|0x64;\n0xFE;|0x0F;');
});

test('iso-8859-1', () => {
  step.setEncoding('ISO-8859-1');
  expectResult('ÅÖ', 'c5d6');
});