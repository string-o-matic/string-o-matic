import StringUtils from './StringUtils';
import ByteUtils from './ByteUtils';

// TODO b64, dec, bin tests copied from steps

test('decode hex utf8 buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-8')).toEqual({ string: 'quidditch', info: null });
});

test('decode hex utf8 emoji buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('e29da4efb88f', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-8')).toEqual({ string: '❤️', info: null });
});

test('decode hex iso-8859-1 buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('717569646469746368', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'ISO-8859-1')).toEqual({ string: 'quidditch', info: null });
});

test('decode hex iso-8859-1 emoji buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('e29da4efb88f', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'ISO-8859-1')).toEqual({ string: '\u{e2}\u{9d}\u{a4}\u{ef}\u{b8}\u{8f}', info: null });
});

test('decode hex utf-16be no bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('007100750069006400640069007400630068', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16BE')).toEqual({ string: 'quidditch', info: null });
});

test('decode hex utf-16be be bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('feff007100750069006400640069007400630068', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16BE')).toEqual({ string: 'quidditch', info: 'Stripped big-endian byte order mark' });
});

test('decode hex utf-16be le bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('fffe007100750069006400640069007400630068', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16BE')).toEqual({ string: 'quidditch', info: 'Stripped little-endian byte order mark' });
});

test('decode hex utf-16be emoji buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('2764fe0f', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16BE')).toEqual({ string: '❤️', info: null });
});

test('decode hex utf-16le no bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('710075006900640064006900740063006800', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16LE')).toEqual({ string: 'quidditch', info: null });
});

test('decode hex utf-16le le bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('fffe710075006900640064006900740063006800', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16LE')).toEqual({ string: 'quidditch', info: 'Stripped little-endian byte order mark' });
});

test('decode hex utf-16le be bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('feff710075006900640064006900740063006800', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16LE')).toEqual({ string: 'quidditch', info: 'Stripped big-endian byte order mark' });
});

test('decode hex utf-16le emoji buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('64270ffe', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16LE')).toEqual({ string: '❤️', info: null });
});

test('decode hex utf-16auto no bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('007100750069006400640069007400630068', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16')).toEqual({ string: 'quidditch', info: 'No byte order mark - assuming big-endian' });
});

test('decode hex utf-16auto le bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('fffe710075006900640064006900740063006800', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16')).toEqual({ string: 'quidditch', info: 'Found little-endian byte order mark' });
});

test('decode hex utf-16auto be bom buffer', () => {
  const buffer = ByteUtils.baseStringToByteStringBuffer('feff007100750069006400640069007400630068', 'hex');
  expect(StringUtils.byteStringBufferToJsString(buffer, 'UTF-16')).toEqual({ string: 'quidditch', info: 'Found big-endian byte order mark' });
});


test('encode hex empty', () => {
  expect(StringUtils.jsStringToBaseString('', 'hex')).toBe('');
});

test('encode bin empty', () => {
  expect(StringUtils.jsStringToBaseString('', 'bin')).toBe('');
});

test('encode dec empty', () => {
  expect(StringUtils.jsStringToBaseString('', 'dec')).toBe('');
});

test('encode b64 empty', () => {
  expect(StringUtils.jsStringToBaseString('', 'b64')).toBe('');
});


test('encode hex default utf-8', () => {
  expect(StringUtils.jsStringToBaseString('quidditch', 'hex')).toBe('717569646469746368');
});

test('encode dec default utf-8', () => {
  expect(StringUtils.jsStringToBaseString('quidditch', 'dec', {separator: ' '})).toBe('113 117 105 100 100 105 116 99 104');
});

test('encode bin default utf-8', () => {
  expect(StringUtils.jsStringToBaseString('quidditch', 'bin', {separator: ' '})).toBe('01110001 01110101 01101001 01100100 01100100 01101001 01110100 01100011 01101000');
});

test('encode b64 default utf-8', () => {
  expect(StringUtils.jsStringToBaseString('quidditch', 'b64')).toBe('cXVpZGRpdGNo');
});

// ########### DECIMAL ##########

// -------- DEFAULT UTF8 --------

test('encode dec empty utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'dec', opts)).toBe('');
});

test('encode dec dollar utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('36');
});

test('encode dec cent utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'dec', opts)).toBe('194 162');
});

test('encode dec euro utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'dec', opts)).toBe('226 130 172');
});

test('encode dec u{10348} utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10348}', 'dec', opts)).toBe('240 144 141 136');
});

// -------- DEFAULT UTF16BE --------

test('encode dec empty utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'dec', opts)).toBe('');
});

test('encode dec dollar utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('0 36');
});

test('encode dec euro utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'dec', opts)).toBe('32 172');
});

test('encode dec U+10437 utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10437}', 'dec', opts)).toBe('216 1 220 55');
});

test('encode dec dollar utf16 bom', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ', bom: true };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('254 255 0 36');
});

// -------- DEFAULT UTF16LE --------

test('encode dec empty utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'dec', opts)).toBe('');
});

test('encode dec dollar utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('36 0');
});

test('encode dec euro utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'dec', opts)).toBe('172 32');
});

test('encode dec U+10437 utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10437}', 'dec', opts)).toBe('1 216 55 220');
});

test('encode dec dollar utf16le bom', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ', bom: true };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('255 254 36 0');
});

// -------- OPTIONS --------

test('encode dec no separator', () => {
  const opts = { separator: '' };
  expect(StringUtils.jsStringToBaseString('¢', 'dec', opts)).toBe('194162');
});

test('encode dec pipe separator', () => {
  const opts = { separator: '|' };
  expect(StringUtils.jsStringToBaseString('¢', 'dec', opts)).toBe('194|162');
});

test('encode dec prefix', () => {
  const opts = { prefix: '\\d', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'dec', opts)).toBe('\\d194 \\d162');
});

test('encode dec suffix', () => {
  const opts = { suffix: ';', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'dec', opts)).toBe('194; 162;');
});

test('encode dec bytes per line', () => {
  const opts = { encoding: 'UTF-16BE', bom: true, line: 2, separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('254 255\n0 36');
});

test('encode dec combined options', () => {
  const opts = { encoding: 'UTF-16BE', bom: true, line: 2, prefix: '\\d', suffix: ';', separator: '|' };
  expect(StringUtils.jsStringToBaseString('$', 'dec', opts)).toBe('\\d254;|\\d255;\n\\d0;|\\d36;');
});


// ############# BIN ############


// -------- DEFAULT UTF8 --------

test('encode bin empty utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'bin', opts)).toBe('');
});

test('encode bin dollar utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('00100100');
});

test('encode bin cent utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'bin', opts)).toBe('11000010 10100010');
});

test('encode bin euro utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'bin', opts)).toBe('11100010 10000010 10101100');
});

test('encode bin u{10348} utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10348}', 'bin', opts)).toBe('11110000 10010000 10001101 10001000');
});

// -------- DEFAULT UTF16BE --------

test('encode bin empty utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'bin', opts)).toBe('');
});

test('encode bin dollar utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('00000000 00100100');
});

test('encode bin euro utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'bin', opts)).toBe('00100000 10101100');
});

test('encode bin U+10437 utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10437}', 'bin', opts)).toBe('11011000 00000001 11011100 00110111');
});

test('encode bin dollar utf16 bom', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ', bom: true };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('11111110 11111111 00000000 00100100');
});

// -------- DEFAULT UTF16LE --------

test('encode bin empty utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'bin', opts)).toBe('');
});

test('encode bin dollar utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('00100100 00000000');
});

test('encode bin euro utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'bin', opts)).toBe('10101100 00100000');
});

test('encode bin U+10437 utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10437}', 'bin', opts)).toBe('00000001 11011000 00110111 11011100');
});

test('encode bin dollar utf16le bom', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ', bom: true };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('11111111 11111110 00100100 00000000');
});

// -------- OPTIONS --------

test('encode bin no separator', () => {
  const opts = { separator: '' };
  expect(StringUtils.jsStringToBaseString('¢', 'bin', opts)).toBe('1100001010100010');
});

test('encode bin pipe separator', () => {
  const opts = { separator: '|' };
  expect(StringUtils.jsStringToBaseString('¢', 'bin', opts)).toBe('11000010|10100010');
});

test('encode bin prefix', () => {
  const opts = { prefix: '\\b', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'bin', opts)).toBe('\\b11000010 \\b10100010');
});

test('encode bin suffix', () => {
  const opts = { suffix: ';', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'bin', opts)).toBe('11000010; 10100010;');
});

test('encode bin bytes per line', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ', bom: true, line: 2 };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('11111110 11111111\n00000000 00100100');
});

test('encode bin combined options', () => {
  const opts = { encoding: 'UTF-16BE', separator: '|', bom: true, line: 2, prefix: '\\b', suffix: ';' };
  expect(StringUtils.jsStringToBaseString('$', 'bin', opts)).toBe('\\b11111110;|\\b11111111;\n\\b00000000;|\\b00100100;');
});

// ############# HEX ############

// -------- DEFAULT UTF8 --------

test('encode hex empty utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'hex', opts)).toBe('');
});

test('encode hex dollar utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('24');
});

test('encode hex cent utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'hex', opts)).toBe('c2 a2');
});

test('encode hex euro utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'hex', opts)).toBe('e2 82 ac');
});

test('encode hex u{10348} utf8', () => {
  const opts = { encoding: 'UTF-8', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10348}', 'hex', opts)).toBe('f0 90 8d 88');
});

// -------- DEFAULT UTF16BE --------

test('encode hex empty utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'hex', opts)).toBe('');
});

test('encode hex dollar utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('00 24');
});

test('encode hex euro utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'hex', opts)).toBe('20 ac');
});

test('encode hex U+10437 utf16', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10437}', 'hex', opts)).toBe('d8 01 dc 37');
});

test('encode hex dollar utf16 bom', () => {
  const opts = { encoding: 'UTF-16BE', separator: ' ', bom: true };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('fe ff 00 24');
});

// -------- DEFAULT UTF16LE --------

test('encode hex empty utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('', 'hex', opts)).toBe('');
});

test('encode hex dollar utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('24 00');
});

test('encode hex euro utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('€', 'hex', opts)).toBe('ac 20');
});

test('encode hex U+10437 utf16le', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('\u{10437}', 'hex', opts)).toBe('01 d8 37 dc');
});

test('encode hex dollar utf16le bom', () => {
  const opts = { encoding: 'UTF-16LE', separator: ' ', bom: true };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('ff fe 24 00');
});

// -------- OPTIONS --------

test('encode hex no separator', () => {
  const opts = { separator: '' };
  expect(StringUtils.jsStringToBaseString('¢', 'hex', opts)).toBe('c2a2');
});

test('encode hex pipe separator', () => {
  const opts = { separator: '|' };
  expect(StringUtils.jsStringToBaseString('¢', 'hex', opts)).toBe('c2|a2');
});

test('encode hex prefix', () => {
  const opts = { prefix: '\\x', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'hex', opts)).toBe('\\xc2 \\xa2');
});

test('encode hex suffix', () => {
  const opts = { suffix: ';', separator: ' ' };
  expect(StringUtils.jsStringToBaseString('¢', 'hex', opts)).toBe('c2; a2;');
});

test('encode hex bytes per line', () => {
  const opts = { encoding: 'UTF-16BE', bom: true, line: 2, separator: ' ' };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('fe ff\n00 24');
});

test('encode hex combined options', () => {
  const opts = { encoding: 'UTF-16BE', bom: true, line: 2, prefix: '\\x', suffix: ';', separator: '|', case: 'upper' };
  expect(StringUtils.jsStringToBaseString('$', 'hex', opts)).toBe('\\xFE;|\\xFF;\n\\x00;|\\x24;');
});


// ############# BASE64 ############

test('encode b64 empty utf8', () => {
  const opts = { encoding: 'UTF-8' };
  expect(StringUtils.jsStringToBaseString('', 'b64', opts)).toBe('');
});

test('encode b64 f utf8', () => {
  const opts = { encoding: 'UTF-8' };
  expect(StringUtils.jsStringToBaseString('f', 'b64', opts)).toBe('Zg==');
});

test('encode b64 fo utf8', () => {
  const opts = { encoding: 'UTF-8' };
  expect(StringUtils.jsStringToBaseString('fo', 'b64', opts)).toBe('Zm8=');
});

test('encode b64 foo utf8', () => {
  const opts = { encoding: 'UTF-8' };
  expect(StringUtils.jsStringToBaseString('foo', 'b64', opts)).toBe('Zm9v');
});

test('encode b64 foobar utf8', () => {
  const opts = { encoding: 'UTF-8' };
  expect(StringUtils.jsStringToBaseString('foobar', 'b64', opts)).toBe('Zm9vYmFy');
});

test('encode b64 line length utf8', () => {
  const opts = { encoding: 'UTF-8', line: 2 };
  expect(StringUtils.jsStringToBaseString('foobar', 'b64', opts)).toBe('Zm\r\n9v\r\nYm\r\nFy');
});

test('encode b64 empty utf16', () => {
  const opts = { encoding: 'UTF-16BE' };
  expect(StringUtils.jsStringToBaseString('', 'b64', opts)).toBe('');
});

test('encode b64 f utf16', () => {
  const opts = { encoding: 'UTF-16BE' };
  expect(StringUtils.jsStringToBaseString('f', 'b64', opts)).toBe('AGY=');
});

test('encode b64 fo utf16', () => {
  const opts = { encoding: 'UTF-16BE' };
  expect(StringUtils.jsStringToBaseString('fo', 'b64', opts)).toBe('AGYAbw==');
});

test('encode b64 foo utf16', () => {
  const opts = { encoding: 'UTF-16BE' };
  expect(StringUtils.jsStringToBaseString('foo', 'b64', opts)).toBe('AGYAbwBv');
});

test('encode b64 foobar utf16', () => {
  const opts = { encoding: 'UTF-16BE' };
  expect(StringUtils.jsStringToBaseString('foobar', 'b64', opts)).toBe('AGYAbwBvAGIAYQBy');
});

test('encode b64 foobar iso', () => {
  const opts = { encoding: 'ISO-8859-1' };
  expect(StringUtils.jsStringToBaseString('foobar', 'b64', opts)).toBe('Zm9vYmFy');
});

test('encode b64 ao iso', () => {
  const opts = { encoding: 'ISO-8859-1' };
  expect(StringUtils.jsStringToBaseString('ÅÖ', 'b64', opts)).toBe('xdY=');
});

test('encode b64 urlsafe1', () => {
  expect(StringUtils.jsStringToBaseString('<>?>', 'b64', { variant: 'urlsafe' })).toBe('PD4_Pg');
  expect(StringUtils.jsStringToBaseString('<>?>', 'b64', { variant: 'standard' })).toBe('PD4/Pg==');
});

test('encode b64 urlsafe2', () => {
  expect(StringUtils.jsStringToBaseString('":><', 'b64', { variant: 'urlsafe' })).toBe('Ijo-PA');
  expect(StringUtils.jsStringToBaseString('":><', 'b64', { variant: 'standard' })).toBe('Ijo+PA==');
});
