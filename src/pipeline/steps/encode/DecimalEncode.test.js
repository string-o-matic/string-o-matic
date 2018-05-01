import DecimalEncode from './DecimalEncode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new DecimalEncode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
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
  step.setEncoding('UTF-16BE');
  step.setBom('1');
  step.setBytesPerLine(2);
  expectResult('$', '254 255\n0 36');
});

test('combined options', () => {
  step.setEncoding('UTF-16BE');
  step.setBom('1');
  step.setBytesPerLine(2);
  step.setPrefix('\\d');
  step.setSuffix(';');
  step.setSeparator('|');
  expectResult('$', '\\d254;|\\d255;\n\\d0;|\\d36;');
});
