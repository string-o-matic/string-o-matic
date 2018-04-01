import BCryptVerify from './BCryptVerify';
import Data from '../../Data';
import {BoolType} from '../../Types';
import bcrypt from 'bcryptjs';
import {randomBytes} from 'crypto';

bcrypt.setRandomFallback(randomBytes);

var step = new BCryptVerify();

test('valid', async () => {
  step.setPassword('P4ssW0Rd!');
  expect.assertions(2);
  const result = await step.calculate(Data.string('$2a$06$/qVvfs8H73yxENHxG4DZDev.oNi6UJhhQcYk6ZZu.TSBw6fy7xAxm'));
  expect(result.type).toBe(BoolType);
  expect(result.data).toBe(true);
});

test('invalid', async () => {
  step.setPassword('incorrect');
  expect.assertions(2);
  const result = await step.calculate(Data.string('$2a$06$/qVvfs8H73yxENHxG4DZDev.oNi6UJhhQcYk6ZZu.TSBw6fy7xAxm'));
  expect(result.type).toBe(BoolType);
  expect(result.data).toBe(false);
});
