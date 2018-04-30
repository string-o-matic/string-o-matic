import * as util from 'node-forge/lib/util';
import ByteUtils, {OutOfRangeError} from './ByteUtils';

test('encode hex empty buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'hex')).toBe('');
});

test('encode bin empty buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'bin')).toBe('');
});

test('encode dec empty buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'dec')).toBe('');
});

test('encode b64 empty buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'b64')).toBe('');
});


test('encode hex buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'hex')).toBe('717569646469746368');
});

test('encode dec buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'dec', {separator: ' '})).toBe('113 117 105 100 100 105 116 99 104');
});

test('encode bin buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'bin', {separator: ' '})).toBe('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000');
});

test('encode b64 buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex');
  expect(ByteUtils.byteStringBufferToBaseString(buffer, 'b64', {separator: ' '})).toBe('cXVpZGRpdGNo');
});

test('encode out of range bytestringbuffer', done => {
  try {
    const buffer = new util.ByteStringBuffer();
    buffer.putByte(0x100);
    ByteUtils.byteStringBufferToBaseString(buffer, 'hex');
    done.fail('error not thrown');
  } catch (e) {
    expect(e).toBeInstanceOf(OutOfRangeError);
    done();
  }
});


test('encode hex bytestring', () => {
  expect(ByteUtils.byteStringToBaseString('quidditch', 'hex')).toBe('717569646469746368');
});

test('encode bin bytestring', () => {
  expect(ByteUtils.byteStringToBaseString('quidditch', 'bin', {separator: ' '})).toBe('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000');
});

test('encode dec bytestring', () => {
  expect(ByteUtils.byteStringToBaseString('quidditch', 'dec', {separator: ' '})).toBe('113 117 105 100 100 105 116 99 104');
});

test('encode b64 bytestring', () => {
  expect(ByteUtils.byteStringToBaseString('quidditch', 'b64', {separator: ' '})).toBe('cXVpZGRpdGNo');
});

test('encode out of range bytestring', done => {
  try {
    ByteUtils.byteStringToBaseString('\u0100', 'hex');
    done.fail('error not thrown');
  } catch (e) {
    expect(e).toBeInstanceOf(OutOfRangeError);
    done();
  }
});


test('decode hex empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'hex').toHex()).toBe('');
});

test('decode dec empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'dec').toHex()).toBe('');
});

test('decode bin empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'bin').toHex()).toBe('');
});

test('decode b64 empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'b64').toHex()).toBe('');
});



test('decode hex', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex').toHex()).toBe('717569646469746368');
});

test('decode dec', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('113 117 105 100 100 105 116 99 104', 'dec').toHex()).toBe('717569646469746368');
});

test('decode bin', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('011100010111010101101001011001000110010001101001011101000110001101101000', 'bin').toHex()).toBe('717569646469746368');
});

test('decode b64', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('cXVpZGRpdGNo', 'b64').toHex()).toBe('717569646469746368');
});


test('decode hex 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('c0cbced5da', 'hex').toHex()).toBe('c0cbced5da');
});

test('decode dec 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('192 203 206 213 218', 'dec').toHex()).toBe('c0cbced5da');
});

test('decode bin 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('1100000011001011110011101101010111011010', 'bin').toHex()).toBe('c0cbced5da');
});

test('decode b64 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('wMvO1do=', 'b64').toHex()).toBe('c0cbced5da');
});


test('decode hex with separator', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('71 75 69 64 64 69 74 63 68', 'hex').toHex()).toBe('717569646469746368');
});

test('decode bin with separator', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000', 'bin').toHex()).toBe('717569646469746368');
});


test('decode hex with prefixes', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('0x71;0x75;0x69;0x64;0x64;0x69;0x74;0x63;0x68;', 'hex').toHex()).toBe('717569646469746368');
});

test('decode bin with prexies', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('0b01110001;0b01110101;0b01101001;0b01100100;0b01100100;0b01101001;0b01110100;0b01100011;0b01101000;', 'bin').toHex()).toBe('717569646469746368');
});


test('decode decimal out of range', done => {
  try {
    ByteUtils.baseStringToByteStringBuffer('97 98 99 256', 'dec');
    done.fail('error not thrown');
  } catch (e) {
    expect(e).toBeInstanceOf(OutOfRangeError);
    done();
  }
});
