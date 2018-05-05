import TextToBytes from './TextToBytes';
import Data from '../../Data';
import {ByteArrayType} from '../../Types';

let step;

beforeEach(() => {
  step = new TextToBytes();
});

const empty = new Uint8Array(0);
const quidditch = new Uint8Array([0x71, 0x75, 0x69, 0x64, 0x64, 0x69, 0x74, 0x63, 0x68]);
const aeiou = new Uint8Array([0xc0, 0xcb, 0xce, 0xd5, 0xda]);

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(ByteArrayType);
  expect(result.data).toEqual(output);
}

test('hex empty', () => {
  step.setSource('hex');
  expectResult('', empty);
});

test('dec empty', () => {
  step.setSource('dec');
  expectResult('', empty);
});

test('bin empty', () => {
  step.setSource('bin');
  expectResult('', empty);
});

test('b64 empty', () => {
  step.setSource('b64');
  expectResult('', empty);
});



test('hex', () => {
  step.setSource('hex');
  expectResult('717569646469746368', quidditch);
});

test('dec', () => {
  step.setSource('dec');
  expectResult('113 117 105 100 100 105 116 99 104', quidditch);
});

test('bin', () => {
  step.setSource('bin');
  expectResult('011100010111010101101001011001000110010001101001011101000110001101101000', quidditch);
});

test('b64', () => {
  step.setSource('b64');
  expectResult('cXVpZGRpdGNo', quidditch);
});


test('hex 0x80+', () => {
  step.setSource('hex');
  expectResult('c0cbced5da', aeiou);
});

test('dec 0x80+', () => {
  step.setSource('dec');
  expectResult('192 203 206 213 218', aeiou);
});

test('bin 0x80+', () => {
  step.setSource('bin');
  expectResult('1100000011001011110011101101010111011010', aeiou);
});

test('b64 0x80+', () => {
  step.setSource('b64');
  expectResult('wMvO1do=', aeiou);
});


test('hex with separator', () => {
  step.setSource('hex');
  expectResult('71 75 69 64 64 69 74 63 68', quidditch);
});

test('bin with separator', () => {
  step.setSource('bin');
  expectResult('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000', quidditch);
});


test('hex with prefixes', () => {
  step.setSource('hex');
  expectResult('0x71;0x75;0x69;0x64;0x64;0x69;0x74;0x63;0x68;', quidditch);
});

test('bin with prexies', () => {
  step.setSource('bin');
  expectResult('0b01110001;0b01110101;0b01101001;0b01100100;0b01100100;0b01101001;0b01110100;0b01100011;0b01101000;', quidditch);
});


test('text utf-8', () => {
  step.setSource('plain');
  step.setEncoding('UTF-8');
  expectResult('\u2764\uFE0F', new Uint8Array([0xe2, 0x9d, 0xa4, 0xef, 0xb8, 0x8f]));
});

test('text utf-16be', () => {
  step.setSource('plain');
  step.setEncoding('UTF-16BE');
  expectResult('\u2764\uFE0F', new Uint8Array([0x27, 0x64, 0xfe, 0x0f]));
});

test('text utf-16le', () => {
  step.setSource('plain');
  step.setEncoding('UTF-16LE');
  expectResult('\u2764\uFE0F', new Uint8Array([0x64, 0x27, 0x0f, 0xfe]));
});

test('text iso', () => {
  step.setSource('plain');
  step.setEncoding('ISO-8859-1');
  expectResult('abc$ø', new Uint8Array([0x61, 0x62, 0x63, 0x24, 0xf8]));
});

test('text iso > 0xFF', () => {
  step.setSource('plain');
  step.setEncoding('ISO-8859-1');
  const result = step.calculate(Data.string('\u2764\uFE0F'));
  expect(result.status).toBe('invalid');
});

test('decimal out of range', () => {
  step.setSource('dec');
  const result = step.calculate(Data.string('97 98 99 256'));
  expect(result.status).toBe('invalid');
});
