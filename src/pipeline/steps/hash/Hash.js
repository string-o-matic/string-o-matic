import * as util from 'node-forge/lib/util';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteArrayType} from '../../Types';
import ByteUtils from '../../../lib/ByteUtils';

class Hash extends Step {

  static supports = [ StringType, ByteArrayType ];
  static input = ByteArrayType;
  static output = ByteArrayType;

  constructor(hash) {
    super();
    this.hash = hash;
  }

  _update() {
    this.output = null;
    this.passInput();
  }

  calculate(input) {
    this.hash.start();
    this.hash.update(util.createBuffer(input.data).getBytes());
    return Data.byteArray(ByteUtils.byteStringBufferToUint8Array(this.hash.digest()));
  }

}

export default Hash;
