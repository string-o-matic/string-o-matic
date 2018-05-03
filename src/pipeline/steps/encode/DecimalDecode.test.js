import DecimalDecode from './DecimalDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new DecimalDecode();
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
  expectResult('36', '$');
});

test('cent utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('194 162', '¢');
});

test('euro utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('226 130 172', '€');
});

test('u{10348} utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('240 144 141 136', '\u{10348}');
});

// -------- DEFAULT UTF16BE --------

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('dollar utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('0 36', '$');
});

test('euro utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('32 172', '€');
});

test('U+10437 utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('216 1 220 55', '\u{10437}');
});

test('dollar utf16 bom', () => {
  step.setEncoding('UTF-16');
  expectResult('254 255 0 36', '$');
});

// -------- DEFAULT UTF16LE --------

test('empty utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('', '');
});

test('dollar utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('36 0', '$');
});

test('euro utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('172 32', '€');
});

test('U+10437 utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('1 216 55 220', '\u{10437}');
});

test('dollar utf16le bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('255 254 36 0', '$');
});

// -------- OPTIONS --------

test('no separator', () => {
  // FIXME needs error message
  expectResult('194 162', '¢');
});

test('pipe separator', () => {
  expectResult('194|162', '¢');
});

test('prefix', () => {
  expectResult('\\d194 \\d162', '¢');
});

test('suffix', () => {
  expectResult('194; 162;', '¢');
});

test('multiline', () => {
  step.setEncoding('UTF-16BE');
  expectResult('254 255\n0 36', '$');
});

test('combined options', () => {
  step.setEncoding('UTF-16BE');
  expectResult('\\d254;|\\d255;\n\\d0;|\\d36;', '$');
});

// -------- BOM DETECTION --------

test('utf16be correct bom', () => {
  step.setEncoding('UTF-16BE');
  expectResult('254 255 0 36', '$', 'Stripped big-endian byte order mark');
});

test('utf16be incorrect bom', () => {
  step.setEncoding('UTF-16BE');
  expectResult('255 254 0 36', '$', 'Stripped little-endian byte order mark');
});

test('utf16le correct bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('255 254 36 0', '$', 'Stripped little-endian byte order mark');
});

test('utf16le incorrect bom', () => {
  step.setEncoding('UTF-16LE');
  expectResult('254 255 36 0', '$', 'Stripped big-endian byte order mark');
});

test('utf16be auto bom', () => {
  step.setEncoding('UTF-16');
  expectResult('254 255 0 36', '$', 'Found big-endian byte order mark');
});

test('utf16le auto bom', () => {
  step.setEncoding('UTF-16');
  expectResult('255 254 36 0', '$', 'Found little-endian byte order mark');
});

test('utf16be auto no bom', () => {
  step.setEncoding('UTF-16');
  expectResult('0 36', '$', 'No byte order mark - assuming big-endian');
});
