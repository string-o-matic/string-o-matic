import TextToBytes from './TextToBytes';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';

let step;

beforeEach(() => {
  step = new TextToBytes();
});

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('hex empty', () => {
  step.setSource('hex');
  expectResult('', '');
});

test('dec empty', () => {
  step.setSource('dec');
  expectResult('', '');
});

test('bin empty', () => {
  step.setSource('bin');
  expectResult('', '');
});

test('b64 empty', () => {
  step.setSource('b64');
  expectResult('', '');
});



test('hex', () => {
  step.setSource('hex');
  expectResult('717569646469746368', '717569646469746368');
});

test('dec', () => {
  step.setSource('dec');
  expectResult('113 117 105 100 100 105 116 99 104', '717569646469746368');
});

test('bin', () => {
  step.setSource('bin');
  expectResult('011100010111010101101001011001000110010001101001011101000110001101101000', '717569646469746368');
});

test('b64', () => {
  step.setSource('b64');
  expectResult('cXVpZGRpdGNo', '717569646469746368');
});


test('hex 0x80+', () => {
  step.setSource('hex');
  expectResult('c0cbced5da', 'c0cbced5da');
});

test('dec 0x80+', () => {
  step.setSource('dec');
  expectResult('192 203 206 213 218', 'c0cbced5da');
});

test('bin 0x80+', () => {
  step.setSource('bin');
  expectResult('1100000011001011110011101101010111011010', 'c0cbced5da');
});

test('b64 0x80+', () => {
  step.setSource('b64');
  expectResult('wMvO1do=', 'c0cbced5da');
});


test('hex with separator', () => {
  step.setSource('hex');
  expectResult('71 75 69 64 64 69 74 63 68', '717569646469746368');
});

test('bin with separator', () => {
  step.setSource('bin');
  expectResult('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000', '717569646469746368');
});


test('hex with prefixes', () => {
  step.setSource('hex');
  expectResult('0x71;0x75;0x69;0x64;0x64;0x69;0x74;0x63;0x68;', '717569646469746368');
});

test('bin with prexies', () => {
  step.setSource('bin');
  expectResult('0b01110001;0b01110101;0b01101001;0b01100100;0b01100100;0b01101001;0b01110100;0b01100011;0b01101000;', '717569646469746368');
});


test('text utf-8', () => {
  step.setSource('plain');
  step.setEncoding('UTF-8');
  expectResult('\u2764\uFE0F', 'e29da4efb88f');
});

test('text utf-16be', () => {
  step.setSource('plain');
  step.setEncoding('UTF-16BE');
  expectResult('\u2764\uFE0F', '2764fe0f');
});

test('text utf-16le', () => {
  step.setSource('plain');
  step.setEncoding('UTF-16LE');
  expectResult('\u2764\uFE0F', '64270ffe');
});

test('text iso', () => {
  step.setSource('plain');
  step.setEncoding('ISO-8859-1');
  expectResult('abc$ø', '61626324f8');
});

test('text iso > 0xFF', () => {
  step.setSource('plain');
  step.setEncoding('ISO-8859-1');
  expectResult('\u2764\uFE0F', '2764fe0f');
});

test('decimal out of range', () => {
  step.setSource('dec');
  const result = step.calculate(Data.string('97 98 99 256'));
  expect(result.status).toBe('invalid');
});
