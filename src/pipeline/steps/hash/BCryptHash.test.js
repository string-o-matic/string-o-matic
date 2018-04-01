import BCryptHash from './BCryptHash';
import BCryptVerify from './BCryptVerify';
import Data from '../../Data';
import {StringType,BoolType} from '../../Types';
import bcrypt from 'bcryptjs';
import {randomBytes} from 'crypto';

bcrypt.setRandomFallback(randomBytes);

var hash = new BCryptHash();
var verify = new BCryptVerify();

test('hash 6', async () => {
  hash.setCost(6);
  expect.assertions(4);
  const hashResult = await hash.calculate(Data.string('_8g#9;<cdj10'));
  expect(hashResult.type).toBe(StringType);
  expect(hashResult.data.indexOf('$2a$06$')).toBe(0);
  verify.setPassword('_8g#9;<cdj10');
  const verifyResult = await verify.calculate(Data.string(hashResult.data));
  expect(verifyResult.type).toBe(BoolType);
  expect(verifyResult.data).toBe(true);
});

test('hash 4', async () => {
  hash.setCost(4);
  expect.assertions(4);
  const hashResult = await hash.calculate(Data.string('_8g#9;<cdj10'));
  expect(hashResult.type).toBe(StringType);
  expect(hashResult.data.indexOf('$2a$04$')).toBe(0);
  verify.setPassword('_8g#9;<cdj10');
  const verifyResult = await verify.calculate(hashResult);
  expect(verifyResult.type).toBe(BoolType);
  expect(verifyResult.data).toBe(true);
});

test('hash 72 bytes', async () => {
  const str72 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
  hash.setCost(4);
  expect.assertions(4);
  const hashResult = await hash.calculate(Data.string(str72));
  expect(hashResult.type).toBe(StringType);
  expect(hashResult.data.indexOf('$2a$04$')).toBe(0);
  verify.setPassword(str72);
  const verifyResult = await verify.calculate(hashResult);
  expect(verifyResult.type).toBe(BoolType);
  expect(verifyResult.data).toBe(true);
});

test('hash 80 bytes uses first 72', async () => {
  const str71 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678';
  const str72 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
  const str80 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567';
  hash.setCost(4);
  expect.assertions(7);
  const hashResult = await hash.calculate(Data.string(str80));
  expect(hashResult.type).toBe(StringType);
  expect(hashResult.data.indexOf('$2a$04$')).toBe(0);
  expect(hashResult.warnings.length).toBe(1);
  expect(hashResult.warnings[0]).toBe('Input exceeds 72 bytes. Only the first 72 bytes are hashed.');

  // Verify first 71 bytes do not match
  verify.setPassword(str71);
  const verify71Result = await verify.calculate(hashResult);
  expect(verify71Result.data).toBe(false);

  // Verify first 72 bytes match
  verify.setPassword(str72);
  const verify72Result = await verify.calculate(hashResult);
  expect(verify72Result.data).toBe(true);

  // Verify all 80 bytes match
  verify.setPassword(str80);
  const verify80Result = await verify.calculate(hashResult);
  expect(verify80Result.data).toBe(true);
});
