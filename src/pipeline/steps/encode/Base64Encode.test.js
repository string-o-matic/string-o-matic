import Base64Encode from './Base64Encode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new Base64Encode();
  step._updateConvertStep(Data.string(''));
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  step.setInput(Data.string(input));
  const result = step.getOutput();
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty utf8', () => {
  step.convertStep.setEncoding('UTF-8');
  expectResult('', '');
});

test('f utf8', () => {
  step.convertStep.setEncoding('UTF-8');
  expectResult('f', 'Zg==');
});

test('fo utf8', () => {
  step.convertStep.setEncoding('UTF-8');
  expectResult('fo', 'Zm8=');
});

test('foo utf8', () => {
  step.convertStep.setEncoding('UTF-8');
  expectResult('foo', 'Zm9v');
});

test('foobar utf8', () => {
  step.convertStep.setEncoding('UTF-8');
  expectResult('foobar', 'Zm9vYmFy');
});

test('line length utf8', () => {
  step.convertStep.setEncoding('UTF-8');
  step.setLine(2);
  expectResult('foobar', 'Zm\r\n9v\r\nYm\r\nFy');
});

test('empty utf16', () => {
  step.convertStep.setEncoding('UTF-16BE');
  expectResult('', '');
});

test('f utf16', () => {
  step.convertStep.setEncoding('UTF-16BE');
  expectResult('f', 'AGY=');
});

test('fo utf16', () => {
  step.convertStep.setEncoding('UTF-16BE');
  expectResult('fo', 'AGYAbw==');
});

test('foo utf16', () => {
  step.convertStep.setEncoding('UTF-16BE');
  expectResult('foo', 'AGYAbwBv');
});

test('foobar utf16', () => {
  step.convertStep.setEncoding('UTF-16BE');
  expectResult('foobar', 'AGYAbwBvAGIAYQBy');
});

test('foobar iso', () => {
  step.convertStep.setEncoding('ISO-8859-1');
  expectResult('foobar', 'Zm9vYmFy');
});

test('ao iso', () => {
  step.convertStep.setEncoding('ISO-8859-1');
  expectResult('ÅÖ', 'xdY=');
});

test('urlsafe1', () => {
  step.setVariant('urlsafe');
  expectResult('<>?>', 'PD4_Pg');
  step.setVariant('standard');
  expectResult('<>?>', 'PD4/Pg==');
});

test('urlsafe2', () => {
  step.setVariant('urlsafe');
  expectResult('":><', 'Ijo-PA');
  step.setVariant('standard');
  expectResult('":><', 'Ijo+PA==');
});