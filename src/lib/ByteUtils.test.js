import ByteUtils, {OutOfRangeError} from './ByteUtils';

test('encode hex empty buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'hex')).toBe('');
});

test('encode bin empty buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'bin')).toBe('');
});

test('encode dec empty buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'dec')).toBe('');
});

test('encode b64 empty buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'b64')).toBe('');
});


test('encode hex buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('717569646469746368', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'hex')).toBe('717569646469746368');
});

test('encode dec buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('717569646469746368', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'dec', {separator: ' '})).toBe('113 117 105 100 100 105 116 99 104');
});

test('encode bin buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('717569646469746368', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'bin', {separator: ' '})).toBe('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000');
});

test('encode b64 buffer', () => {
  const buffer = ByteUtils.baseStringToUint8Array('717569646469746368', 'hex');
  expect(ByteUtils.uint8ArrayToBaseString(buffer, 'b64', {separator: ' '})).toBe('cXVpZGRpdGNo');
});

test('encode out of range byte array', done => {
  try {
    // Uint8Array nulls any value over 0xFF so this should be impossible
    ByteUtils.uint8ArrayToBaseString(new Uint16Array([0x100]), 'hex');
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

const empty = new Uint8Array(0);
const quidditch = new Uint8Array([0x71, 0x75, 0x69, 0x64, 0x64, 0x69, 0x74, 0x63, 0x68]);
const hello = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
const aeiou = new Uint8Array([0xc0, 0xcb, 0xce, 0xd5, 0xda]);

test('decode hex empty', () => {
  expect(ByteUtils.baseStringToUint8Array('', 'hex')).toEqual(empty);
});

test('decode dec empty', () => {
  expect(ByteUtils.baseStringToUint8Array('', 'dec')).toEqual(empty);
});

test('decode bin empty', () => {
  expect(ByteUtils.baseStringToUint8Array('', 'bin')).toEqual(empty);
});

test('decode b64 empty', () => {
  expect(ByteUtils.baseStringToUint8Array('', 'b64')).toEqual(empty);
});


test('decode hex', () => {
  expect(ByteUtils.baseStringToUint8Array('717569646469746368', 'hex')).toEqual(quidditch);
});

test('decode dec', () => {
  expect(ByteUtils.baseStringToUint8Array('113 117 105 100 100 105 116 99 104', 'dec')).toEqual(quidditch);
});

test('decode bin', () => {
  expect(ByteUtils.baseStringToUint8Array('011100010111010101101001011001000110010001101001011101000110001101101000', 'bin')).toEqual(quidditch);
});

test('decode b64', () => {
  expect(ByteUtils.baseStringToUint8Array('cXVpZGRpdGNo', 'b64')).toEqual(quidditch);
});

test('decode b64 unix lines', () => {
  expect(ByteUtils.baseStringToUint8Array('aGVs\nbG8=', 'b64')).toEqual(hello);
});

test('decode b64 windows lines', () => {
  expect(ByteUtils.baseStringToUint8Array('aGVs\r\nbG8=', 'b64')).toEqual(hello);
});

test('decode hex 0x80+', () => {
  expect(ByteUtils.baseStringToUint8Array('c0cbced5da', 'hex')).toEqual(aeiou);
});

test('decode dec 0x80+', () => {
  expect(ByteUtils.baseStringToUint8Array('192 203 206 213 218', 'dec')).toEqual(aeiou);
});

test('decode bin 0x80+', () => {
  expect(ByteUtils.baseStringToUint8Array('1100000011001011110011101101010111011010', 'bin')).toEqual(aeiou);
});

test('decode b64 0x80+', () => {
  expect(ByteUtils.baseStringToUint8Array('wMvO1do=', 'b64')).toEqual(aeiou);
});


test('decode hex with separator', () => {
  expect(ByteUtils.baseStringToUint8Array('71 75 69 64 64 69 74 63 68', 'hex')).toEqual(quidditch);
});

test('decode bin with separator', () => {
  expect(ByteUtils.baseStringToUint8Array('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000', 'bin')).toEqual(quidditch);
});


test('decode hex with prefixes', () => {
  expect(ByteUtils.baseStringToUint8Array('0x71;0x75;0x69;0x64;0x64;0x69;0x74;0x63;0x68;', 'hex')).toEqual(quidditch);
});

test('decode hex with mixed case prefixes', () => {
  expect(ByteUtils.baseStringToUint8Array('0X71;0x75;0x69;0X64;0x64;0x69;0X74;0x63;0x68;', 'hex')).toEqual(quidditch);
});

test('decode bin with prefixes', () => {
  expect(ByteUtils.baseStringToUint8Array('0b01110001;0b01110101;0b01101001;0b01100100;0b01100100;0b01101001;0b01110100;0b01100011;0b01101000;', 'bin')).toEqual(quidditch);
});

test('decode bin with mixed case prefixes', () => {
  expect(ByteUtils.baseStringToUint8Array('0b01110001;0B01110101;0B01101001;0b01100100;0b01100100;0B01101001;0b01110100;0B01100011;0b01101000;', 'bin')).toEqual(quidditch);
});


test('decode decimal out of range', done => {
  try {
    ByteUtils.baseStringToUint8Array('97 98 99 256', 'dec');
    done.fail('error not thrown');
  } catch (e) {
    expect(e).toBeInstanceOf(OutOfRangeError);
    done();
  }
});
