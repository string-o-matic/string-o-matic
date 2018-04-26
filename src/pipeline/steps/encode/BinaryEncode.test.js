import * as md5 from 'node-forge/lib/md5';
import * as util from 'node-forge/lib/util';
import BinaryEncode from './BinaryEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new BinaryEncode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

// -------- DEFAULT UTF8 --------

test('empty utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('', '');
});

test('dollar utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('$', '00100100');
});

test('cent utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('¢', '11000010 10100010');
});

test('euro utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('€', '11100010 10000010 10101100');
});

test('u{10348} utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u{10348}', '11110000 10010000 10001101 10001000');
});

// -------- DEFAULT UTF16BE --------

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('dollar utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('$', '00000000 00100100');
});

test('euro utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('€', '00100000 10101100');
});

test('U+10437 utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u{10437}', '11011000 00000001 11011100 00110111');
});

test('dollar utf16 bom', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  expectResult('$', '11111110 11111111 00000000 00100100');
});

// -------- DEFAULT UTF16LE --------

test('empty utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('', '');
});

test('dollar utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('$', '00100100 00000000');
});

test('euro utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('€', '10101100 00100000');
});

test('U+10437 utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('\u{10437}', '00000001 11011000 00110111 11011100');
});

test('dollar utf16le bom', () => {
  step.setEncoding('UTF-16LE');
  step.setBom('1');
  expectResult('$', '11111111 11111110 00100100 00000000');
});

// -------- BYTESTRING --------

test('md5', () => {
  const hash = md5.create();
  hash.update(util.encodeUtf8('Grumpy wizards make toxic brew for the evil queen and jack'));
  const result = step.calculate(Data.byteStringBuffer(hash.digest()));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe('10001010 00100011 10010010 01011100 11010001 00010001 10110101 10010000 11001010 11101100 11010001 00010011 01101110 10010110 10100111 11101010');
});

// -------- OPTIONS --------

test('no separator', () => {
  step.setSeparator('');
  expectResult('¢', '1100001010100010');
});

test('pipe separator', () => {
  step.setSeparator('|');
  expectResult('¢', '11000010|10100010');
});

test('prefix', () => {
  step.setPrefix('\\b');
  expectResult('¢', '\\b11000010 \\b10100010');
});

test('suffix', () => {
  step.setSuffix(';');
  expectResult('¢', '11000010; 10100010;');
});

test('bytes per line', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  step.setBytesPerLine(2);
  expectResult('$', '11111110 11111111\n00000000 00100100');
});

test('combined options', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  step.setBytesPerLine(2);
  step.setPrefix('\\b');
  step.setSuffix(';');
  step.setSeparator('|');
  expectResult('$', '\\b11111110;|\\b11111111;\n\\b00000000;|\\b00100100;');
});
