import HexDecode from './HexDecode';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new HexDecode();

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
  expectResult('616263', 'abc');
});

test('space utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('20', ' ');
});

test('pound utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('c2a3', '\u00A3');
});

test('dash emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('f09f92a8', '\uD83D\uDCA8');
});

test('heavy black heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('e29da4', '\u2764');
});

test('red heart emoji utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('e29da4efb88f', '\u2764\uFE0F');
});

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('abc utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('006100620063', 'abc');
});

test('space utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('0020', ' ');
});

test('pound utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('00a3', '\u00A3');
});

test('dash emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('d83ddca8', '\uD83D\uDCA8');
});

test('heavy black heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('2764', '\u2764');
});

test('red heart emoji utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('2764fe0f', '\u2764\uFE0F');
});
