import AsyncTest from './AsyncTest';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new AsyncTest();

test('sync', () => {
  const result = step.calculate(Data.string('_'));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe('_ (AsyncTest-1)');
});

test('zero gives promise', () => {
  const result = step.calculate(Data.string('0'));
  expect(result.constructor.name).toBe('Promise');
});

test('zero promise resolves', async () => {
  expect.assertions(2);
  const result = await step.calculate(Data.string('0'));
  expect(result.type).toBe(StringType);
  expect(result.data).toBe('0 (AsyncTest-1)');
});
