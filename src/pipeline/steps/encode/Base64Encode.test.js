import Base64Encode from './Base64Encode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new Base64Encode();
});

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('', '');
});

test('f utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('f', 'Zg==');
});

test('fo utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('fo', 'Zm8=');
});

test('foo utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('foo', 'Zm9v');
});

test('foobar utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('foobar', 'Zm9vYmFy');
});

test('line length utf8', () => {
  step.setEncoding('UTF-8');
  step.setLineLength(2);
  expectResult('foobar', 'Zm\r\n9v\r\nYm\r\nFy');
});

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('f utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('f', 'AGY=');
});

test('fo utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('fo', 'AGYAbw==');
});

test('foo utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('foo', 'AGYAbwBv');
});

test('foobar utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('foobar', 'AGYAbwBvAGIAYQBy');
});

test('foobar iso', () => {
  step.setEncoding('ISO-8859-1');
  expectResult('foobar', 'Zm9vYmFy');
});

test('ao iso', () => {
  step.setEncoding('ISO-8859-1');
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