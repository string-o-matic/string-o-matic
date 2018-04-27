import BinaryDecode from './BinaryDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new BinaryDecode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output, info) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
  if (info) {
    expect(result.infos[0]).toBe(info);
  }
}

// -------- DEFAULT UTF8 --------

test('empty utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('', '');
});

test('dollar utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('00100100', '$');
});

test('dollar utf8 without leading zeros', () => {
  step.setEncoding('UTF-8');
  expectResult('100100', '$');
});

test('cent utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('11000010 10100010', '¢');
});

test('euro utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('11100010 10000010 10101100', '€');
});

test('u{10348} utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('11110000 10010000 10001101 10001000', '\u{10348}');
});

// -------- DEFAULT UTF16BE --------

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('dollar utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('00000000 00100100', '$');
});

test('dollar utf16 without leading zeros', () => {
  step.setEncoding('UTF-16');
  expectResult('0 100100', '$');
});

test('euro utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('00100000 10101100', '€');
});

test('U+10437 utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('11011000 00000001 11011100 00110111', '\u{10437}');
});

test('dollar utf16 bom', () => {
  step.setEncoding('UTF-16');
  expectResult('11111110 11111111 00000000 00100100', '$');
});

// -------- DEFAULT UTF16LE --------

test('empty utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('', '');
});

test('dollar utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('00100100 00000000', '$');
});

test('dollar utf16le without leading zeros', () => {
  step.setEncoding('UTF-16LE');
  expectResult('100100 0', '$');
});

test('euro utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('10101100 00100000', '€');
});

test('U+10437 utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('00000001 11011000 00110111 11011100', '\u{10437}');
});

test('dollar utf16le bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('11111111 11111110 00100100 00000000', '$');
});

// -------- OPTIONS --------

test('no separator', () => {
  expectResult('1100001010100010', '¢');
});

test('pipe separator', () => {
  expectResult('11000010|10100010', '¢');
});

test('prefix', () => {
  expectResult('\\b11000010 \\b10100010', '¢');
});

test('0b prefix', () => {
  expectResult('0b110000100B10100010', '¢');
});

test('suffix', () => {
  expectResult('11000010; 10100010;', '¢');
});

test('multiline', () => {
  step.setEncoding('UTF-16');
  expectResult('11111110 11111111\n00000000 00100100', '$');
});

test('combined options', () => {
  step.setEncoding('UTF-16');
  expectResult('\\b11111110;|\\b11111111;\n\\b00000000;|\\b00100100;', '$');
});

// -------- BOM DETECTION --------

test('utf16be correct bom', () => {
  step.setEncoding('UTF-16');
  expectResult('11111110 11111111 00000000 00100100', '$', 'Stripped big-endian byte order mark (11111110 11111111)');
});

test('utf16be incorrect bom', () => {
  step.setEncoding('UTF-16');
  expectResult('11111111 11111110 00000000 00100100', '$', 'Stripped little-endian byte order mark (11111111 11111110)');
});

test('utf16le correct bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('11111111 11111110 00100100 00000000', '$', 'Stripped little-endian byte order mark (11111111 11111110)');
});

test('utf16le incorrect bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('11111110 11111111 00100100 00000000', '$', 'Stripped big-endian byte order mark (11111110 11111111)');
});

test('utf16be auto bom', () => {
  step.setEncoding('UTF-16AUTO');
  expectResult('11111110 11111111 00000000 00100100', '$', 'Found big-endian byte order mark');
});

test('utf16le auto bom', () => {
  step.setEncoding('UTF-16AUTO');
  expectResult('11111111 11111110 00100100 00000000', '$', 'Found little-endian byte order mark');
});

test('utf16be auto no bom', () => {
  step.setEncoding('UTF-16AUTO');
  expectResult('00000000 00100100', '$', 'No byte order mark - assuming big-endian');
});
