import HexEncode from './HexEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new HexEncode();
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
  expectResult('\u2764\uFE0F', 'e2 9d a4 ef b8 8f');
});

test('no separator', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.setSeparator('');
  expectResult('\u2764\uFE0F', '2764fe0f');
});

test('line length 2', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.setBytesPerLine(2);
  expectResult('\u2764\uFE0F', '27 64\nfe 0f');
});

test('x prefix', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.setPrefix('\\x');
  expectResult('\u2764\uFE0F', '\\x27 \\x64 \\xfe \\x0f');
});

test('; suffix', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.setSuffix(';');
  expectResult('\u2764\uFE0F', '27; 64; fe; 0f;');
});

test('uppercase', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.setCase('upper');
  expectResult('\u2764\uFE0F', '27 64 FE 0F');
});

test('combined options', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.setPrefix('0x');
  step.setSuffix(';');
  step.setSeparator('|');
  step.setBytesPerLine(2);
  step.setCase('upper');
  expectResult('\u2764\uFE0F', '0x27;|0x64;\n0xFE;|0x0F;');
});

test('iso-8859-1', () => {
  step.convertStep.setEncoding('ISO-8859-1');
  expectResult('ÅÖ', 'c5 d6');
});