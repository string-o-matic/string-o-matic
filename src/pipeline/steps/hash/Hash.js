import * as util from 'node-forge/lib/util';
import Step from '../Step';
import Data from '../../Data';
import {StringType,ByteStringBufferType} from '../../Types';

class Hash extends Step {

  static supports = [ StringType, ByteStringBufferType ];
  static output = ByteStringBufferType;

  constructor(hash) {
    super();
    this.hash = hash;
  }

  calculate(input) {
    this.hash.start();
    if (input.type === StringType) {
      // FIXME needs selectable encoding
      this.hash.update(util.encodeUtf8(input.data));
    } else {
      this.hash.update(util.createBuffer(input.data).getBytes());
    }
    return Data.byteStringBuffer(this.hash.digest());
  }

}

export default Hash;
