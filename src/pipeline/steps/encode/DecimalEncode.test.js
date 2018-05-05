import DecimalEncode from './DecimalEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new DecimalEncode();
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
  expectResult('\u{10348}', '240 144 141 136');
});

test('no separator', () => {
  step.setSeparator('');
  expectResult('¢', '194162');
});

test('pipe separator', () => {
  step.setSeparator('|');
  expectResult('¢', '194|162');
});

test('prefix', () => {
  step.setPrefix('\\d');
  expectResult('¢', '\\d194 \\d162');
});

test('suffix', () => {
  step.setSuffix(';');
  expectResult('¢', '194; 162;');
});

test('bytes per line', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setLine(2);
  expectResult('$', '254 255\n0 36');
});

test('bytes per line str', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setLine('2');
  expectResult('$', '254 255\n0 36');
});

test('bytes per line invalid', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setLine('x');
  expectResult('$', '254 255 0 36');
});

test('bytes per line out of range', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setLine('-1');
  expectResult('$', '254 255 0 36');
});

test('combined options', () => {
  step.convertStep.setEncoding('UTF-16BE');
  step.convertStep.toggleBom();
  step.setLine(2);
  step.setPrefix('\\d');
  step.setSuffix(';');
  step.setSeparator('|');
  expectResult('$', '\\d254;|\\d255;\n\\d0;|\\d36;');
});
