import HexDecode from './HexDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step = new HexDecode();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output, info) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
  if (info) {
    expect(result.infos[0]).toBe(info);
  }
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

test('empty utf16be', () => {
  step.setEncoding('UTF-16BE');
  expectResult('', '');
});

test('abc utf16be', () => {
  step.setEncoding('UTF-16BE');
  expectResult('006100620063', 'abc');
});

test('space utf16be', () => {
  step.setEncoding('UTF-16BE');
  expectResult('0020', ' ');
});

test('space utf16be without leading zeros', () => {
  step.setEncoding('UTF-16BE');
  expectResult('0 20', ' ');
});

test('pound utf16be', () => {
  step.setEncoding('UTF-16BE');
  expectResult('00a3', '\u00A3');
});

test('pound utf16be without leading zeros', () => {
  step.setEncoding('UTF-16BE');
  expectResult('0 a3', '\u00A3');
});

test('pound utf16be correct bom', () => {
  step.setEncoding('UTF-16BE');
  expectResult('feff00a3', '\u00A3', 'Stripped big-endian byte order mark');
});

test('pound utf16be incorrect bom', () => {
  step.setEncoding('UTF-16BE');
  expectResult('fffe00a3', '\u00A3', 'Stripped little-endian byte order mark');
});

test('abc utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('610062006300', 'abc');
});

test('space utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('2000', ' ');
});

test('pound utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('a300', '\u00A3');
});

test('pound utf16le correct bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('fffea300', '\u00A3', 'Stripped little-endian byte order mark');
});

test('pound utf16le incorrect bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('feffa300', '\u00A3', 'Stripped big-endian byte order mark');
});

test('dash emoji utf16BE', () => {
  step.setEncoding('UTF-16BE');
  expectResult('d83ddca8', '\uD83D\uDCA8');
});

test('heavy black heart emoji utf16BE', () => {
  step.setEncoding('UTF-16BE');
  expectResult('2764', '\u2764');
});

test('red heart emoji utf16BE', () => {
  step.setEncoding('UTF-16BE');
  expectResult('2764fe0f', '\u2764\uFE0F');
});

test('red heart emoji utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('64270ffe', '\u2764\uFE0F');
});

test('separate with spaces', () => {
  step.setEncoding('UTF-16BE');
  expectResult('27 64 fe 0f', '\u2764\uFE0F');
});

test('line length 2', () => {
  step.setEncoding('UTF-16BE');
  expectResult('2764\nfe0f', '\u2764\uFE0F');
});

test('x prefix', () => {
  step.setEncoding('UTF-16BE');
  expectResult('\\x27\\x64\\xfe\\x0f', '\u2764\uFE0F');
});

test('0x prefix', () => {
  step.setEncoding('UTF-16BE');
  expectResult('0x270X640xfe0X0f', '\u2764\uFE0F');
});

test('; suffix', () => {
  step.setEncoding('UTF-16BE');
  expectResult('27;64;fe;0f;', '\u2764\uFE0F');
});

test('uppercase', () => {
  step.setEncoding('UTF-16BE');
  expectResult('2764FE0F', '\u2764\uFE0F');
});

test('combined options', () => {
  step.setEncoding('UTF-16BE');
  expectResult('0x27;|0x64;\n0xFE;|0x0F;', '\u2764\uFE0F');
});

test('iso-8859-1', () => {
  step.setEncoding('ISO-8859-1');
  expectResult('c5d6', 'ÅÖ');
});

test('pound utf16 be auto bom', () => {
  step.setEncoding('UTF-16');
  expectResult('feff00a3', '\u00A3', 'Found big-endian byte order mark');
});

test('pound utf16 le auto bom', () => {
  step.setEncoding('UTF-16');
  expectResult('fffea300', '\u00A3', 'Found little-endian byte order mark');
});

test('pound utf16 be auto no bom', () => {
  step.setEncoding('UTF-16');
  expectResult('00a3', '\u00A3', 'No byte order mark - assuming big-endian');
});