import ByteUtils from './ByteUtils';

test('hex empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'hex').toHex()).toBe('');
});

test('dec empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'dec').toHex()).toBe('');
});

test('bin empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'bin').toHex()).toBe('');
});

test('b64 empty', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('', 'b64').toHex()).toBe('');
});



test('hex', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex').toHex()).toBe('717569646469746368');
});

test('dec', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('113 117 105 100 100 105 116 99 104', 'dec').toHex()).toBe('717569646469746368');
});

test('bin', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('011100010111010101101001011001000110010001101001011101000110001101101000', 'bin').toHex()).toBe('717569646469746368');
});

test('b64', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('cXVpZGRpdGNo', 'b64').toHex()).toBe('717569646469746368');
});


test('hex 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('c0cbced5da', 'hex').toHex()).toBe('c0cbced5da');
});

test('dec 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('192 203 206 213 218', 'dec').toHex()).toBe('c0cbced5da');
});

test('bin 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('1100000011001011110011101101010111011010', 'bin').toHex()).toBe('c0cbced5da');
});

test('b64 0x80+', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('wMvO1do=', 'b64').toHex()).toBe('c0cbced5da');
});


test('hex with separator', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('71 75 69 64 64 69 74 63 68', 'hex').toHex()).toBe('717569646469746368');
});

test('bin with separator', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000', 'bin').toHex()).toBe('717569646469746368');
});


test('hex with prefixes', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('0x71;0x75;0x69;0x64;0x64;0x69;0x74;0x63;0x68;', 'hex').toHex()).toBe('717569646469746368');
});

test('bin with prexies', () => {
  expect(ByteUtils.baseStringToByteStringBuffer('0b01110001;0b01110101;0b01101001;0b01100100;0b01100100;0b01101001;0b01110100;0b01100011;0b01101000;', 'bin').toHex()).toBe('717569646469746368');
});


test('decimal out of range', done => {
  try {
    ByteUtils.baseStringToByteStringBuffer('97 98 99 256', 'dec');
    done.fail('error not thrown');
  } catch (e) {
    expect(e.message).toBe('out_of_range');
    done();
  }
});
