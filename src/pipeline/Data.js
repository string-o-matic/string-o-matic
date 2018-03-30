import {NullType, BoolType, StringType, ByteStringBufferType} from './Types';

class Data {

  status = null;
  type = null;
  data = null;
  message = null;
  inputType = null;

  constructor(status, type, data) {
    this.status = status;
    this.type = type;
    this.data = data;
  }

  static bool(data) {
    return new Data('valid', BoolType, data);
  }

  static string(data) {
    return new Data('valid', StringType, data);
  }

  static byteStringBuffer(data) {
    return new Data('valid', ByteStringBufferType, data);
  }

  static nul() {
    return new Data('valid', NullType, null);
  }

  static invalid(message) {
    const data = new Data('invalid', null, null);
    data.message = message;
    return data;
  }

  static unsupported(inputType) {
    const data = new Data('unsupported', null, null);
    data.inputType = inputType;
    return data;
  }

  static bug() {
    return new Data('bug', null, null);
  }

  static brokenPipe() {
    return new Data('broken-pipe', null, null);
  }

}

export default Data;