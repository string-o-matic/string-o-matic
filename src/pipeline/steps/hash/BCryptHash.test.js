import BCryptHash from './BCryptHash';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new BCryptHash();

// TODO test configurable iterations
// TODO verify hashes with the BCryptVerify step

test('hash 6', async () => {
  step.setCost(6);
  expect.assertions(2);
  const result = await step.calculate(Data.string('fire'));
  expect(result.type).toBe(StringType);
  expect(result.data.indexOf('$2a$06$')).toBe(0);
});

test('hash 4', async () => {
  step.setCost(4);
  expect.assertions(2);
  const result = await step.calculate(Data.string('fire'));
  expect(result.type).toBe(StringType);
  expect(result.data.indexOf('$2a$04$')).toBe(0);
});
