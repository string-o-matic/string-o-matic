import Reverse from './Reverse';
import Data from '../../Data';
import {StringType} from '../../Types';

let step = new Reverse();

// No tests for null or unsupported types - superclass rejects them.

function expectResult(input, output) {
  const result = step.calculate(Data.string(input));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe(output);
}

test('empty', () => {
  expectResult('', '');
});

test('string', () => {
  expectResult('LOREM $^&* ipsum\t\r\n ', ' \n\r\tmuspi *&^$ MEROL');
});

test('mixed characters', () => {
  expectResult('£āӨ抾Ⓡকę', 'ęকⓇ抾Өā£');
});

