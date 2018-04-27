import * as md5 from 'node-forge/lib/md5';
import * as util from 'node-forge/lib/util';
import DecimalEncode from './DecimalEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new DecimalEncode();
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
  expectResult('$', '36');
});

test('cent utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('¢', '194 162');
});

test('euro utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('€', '226 130 172');
});

test('u{10348} utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u{10348}', '240 144 141 136');
});

// -------- DEFAULT UTF16BE --------

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('dollar utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('$', '0 36');
});

test('euro utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('€', '32 172');
});

test('U+10437 utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u{10437}', '216 1 220 55');
});

test('dollar utf16 bom', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  expectResult('$', '254 255 0 36');
});

// -------- DEFAULT UTF16LE --------

test('empty utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('', '');
});

test('dollar utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('$', '36 0');
});

test('euro utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('€', '172 32');
});

test('U+10437 utf16le', () => {
  step.setEncoding('UTF-16LE');
  expectResult('\u{10437}', '1 216 55 220');
});

test('dollar utf16le bom', () => {
  step.setEncoding('UTF-16LE');
  step.setBom('1');
  expectResult('$', '255 254 36 0');
});

// -------- BYTESTRING --------

test('md5', () => {
  const hash = md5.create();
  hash.update(util.encodeUtf8('Grumpy wizards make toxic brew for the evil queen and jack'));
  const result = step.calculate(Data.byteStringBuffer(hash.digest()));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe('138 35 146 92 209 17 181 144 202 236 209 19 110 150 167 234');
});

// -------- OPTIONS --------

test('no separator', () => {
  step.setSeparator('');
  expectResult('¢', '194162');
});

test('pipe separator', () => {
  step.setSeparator('|');
  expectResult('¢', '194|162');
});

test('prefix', () => {
  step.setPrefix('\\d');
  expectResult('¢', '\\d194 \\d162');
});

test('suffix', () => {
  step.setSuffix(';');
  expectResult('¢', '194; 162;');
});

test('bytes per line', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  step.setBytesPerLine(2);
  expectResult('$', '254 255\n0 36');
});

test('combined options', () => {
  step.setEncoding('UTF-16');
  step.setBom('1');
  step.setBytesPerLine(2);
  step.setPrefix('\\d');
  step.setSuffix(';');
  step.setSeparator('|');
  expectResult('$', '\\d254;|\\d255;\n\\d0;|\\d36;');
});
