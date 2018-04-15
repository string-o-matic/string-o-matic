import Base64EDecode from './Base64Decode';
import Data from '../../Data';
import {StringType} from '../../Types';

let step;

beforeEach(() => {
  step = new Base64EDecode();
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
  expectResult('Zg==', 'f');
});

test('fo utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('Zm8=', 'fo');
});

test('foo utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('Zm9v', 'foo');
});

test('foobar utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('Zm9vYmFy', 'foobar');
});

test('lines ignored utf8', () => {
  step.setEncoding('UTF-8');
  expectResult('Z\nm9v\nYm\nFy', 'foobar');
});

test('empty utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('', '');
});

test('f utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('AGY=', 'f');
});

test('fo utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('AGYAbw==', 'fo');
});

test('foo utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('AGYAbwBv', 'foo');
});

test('foobar utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('AGYAbwBvAGIAYQBy', 'foobar');
});

test('lines ignored utf16', () => {
  step.setEncoding('UTF-16');
  expectResult('AGY\nAbwBv\nAGIA\nYQBy', 'foobar');
});