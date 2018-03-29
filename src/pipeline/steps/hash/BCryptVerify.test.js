import BCryptVerify from './BCryptVerify';
import Data from '../../Data';
import {BoolType} from '../../Types';

var step = new BCryptVerify();

// TODO inject real passwords

test('valid', async () => {
  expect.assertions(2);
  const result = await step.calculate(Data.string('$2a$10$QHZtk91vCk.n.zTKqvUx.ei6CIP9S2LZ9BDx0iiKFBiQV3o9UQgE6'));
  expect(result.type).toBe(BoolType);
  expect(result.data).toBe(true);
});

test('invalid', async () => {
  expect.assertions(2);
  const result = await step.calculate(Data.string('$2a$04$qWL02JombNffokTbhtw5uubGAGo23QH.816nr7jXsQ8EHisjvwHOe'));
  expect(result.type).toBe(BoolType);
  expect(result.data).toBe(false);
});
