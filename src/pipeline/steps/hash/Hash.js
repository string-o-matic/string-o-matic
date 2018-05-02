import * as util from 'node-forge/lib/util';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class Hash extends Step {

  static supports = [ StringType, ByteStringBufferType ];
  static input = ByteStringBufferType;
  static output = ByteStringBufferType;

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
    return Data.byteStringBuffer(this.hash.digest());
  }

}

export default Hash;
