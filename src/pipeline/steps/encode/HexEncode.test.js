import HexEncode from './HexEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new HexEncode();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  var result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('', '');
});

test('abc utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('abc', '616263');
});

test('space utf8', () => {
  step.setEncoding('UTF-8');
  expectResult(' ', '20');
});

test('pound utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u00A3', 'c2a3');
});

test('dash emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\uD83D\uDCA8', 'f09f92a8');
});

test('heavy black heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u2764', 'e29da4');
});

test('red heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('\u2764\uFE0F', 'e29da4efb88f');
});

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('abc utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('abc', '006100620063');
});

test('space utf16', () => {
  step.setEncoding('UTF-16');
  expectResult(' ', '0020');
});

test('pound utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u00A3', '00a3');
});

test('dash emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\uD83D\uDCA8', 'd83ddca8');
});

test('heavy black heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u2764', '2764');
});

test('red heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('\u2764\uFE0F', '2764fe0f');
});
