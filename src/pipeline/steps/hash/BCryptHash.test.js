import BCryptHash from './BCryptHash';
import Data from '../../Data';
import {StringType} from '../../Types';

var step = new BCryptHash();

// TODO test configurable iterations
// TODO verify hashes with the BCryptVerify step

test('hash', async () => {
  expect.assertions(2);
  const result = await step.calculate(Data.string('fire'));
  expect(result.type).toBe(StringType);
  expect(result.data).toBeTruthy();
});
