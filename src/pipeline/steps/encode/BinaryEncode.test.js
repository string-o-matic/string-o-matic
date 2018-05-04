import BinaryEncode from './BinaryEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new BinaryEncode();
  step._updateConvertStep(Data.string(''));
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  step.setInput(Data.string(input));
  const result = step.getOutput();
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('default', () => {
  expectResult('\u{10348}', '11110000 10010000 10001101 10001000');
});

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
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setBytesPerLine(2);
  expectResult('$', '11111110 11111111\n00000000 00100100');
});

test('bytes per line str', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setBytesPerLine('2');
  expectResult('$', '11111110 11111111\n00000000 00100100');
});

test('bytes per line invalid', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setBytesPerLine('x');
  expectResult('$', '11111110 11111111 00000000 00100100');
});

test('bytes per line out of range', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setBytesPerLine('-1');
  expectResult('$', '11111110 11111111 00000000 00100100');
});

test('combined options', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setBytesPerLine(2);
  step.setPrefix('\\b');
  step.setSuffix(';');
  step.setSeparator('|');
  expectResult('$', '\\b11111110;|\\b11111111;\n\\b00000000;|\\b00100100;');
});
