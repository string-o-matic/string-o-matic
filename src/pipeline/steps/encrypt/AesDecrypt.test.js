import AesDecrypt from './AesDecrypt';
import Data from '../../Data';
import {ByteStringBufferType} from '../../Types';
import ByteUtils from '../../../lib/ByteUtils';

let step;

beforeEach(() => {
  step = new AesDecrypt();
});

function expectResult(input, output) {
  const result = step.calculate(Data.byteStringBuffer(input));
  expect(result.type).toBe(ByteStringBufferType);
  expect(result.data.toHex()).toBe(output);
}

test('aes128-cbc', () => {
  // plainHex is md5('Grumpy wizards make toxic brew for the evil queen and jack')
  const plainHex = '8a23925cd111b590caecd1136e96a7ea';
  const keyHex = '707172737475767778797a7b7c7d7e7f';
  const ivHex = '808182838485868788898a8b8c8d8e8f';
  const resultHex = '4a895383d7b1dfa600fc55bf3929e08302a11c2815501ee9fe69b019f73e45f9';

  step.setCipher('AES-128-CBC');
  step.setKeyType('hex');
  step.setKey(keyHex);
  step.setIvType('hex');
  step.setIv(ivHex);

  expectResult(ByteUtils.baseStringToByteStringBuffer(resultHex, 'hex'), plainHex);
});
