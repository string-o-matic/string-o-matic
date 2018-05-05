import {NullType, BoolType, StringType, ByteArrayType} from './Types';

class Data {

  status = null;
  type = null;
  data = null;
  message = null;
  inputType = null;
  warnings = [];
  infos = [];
  context = {};
  sequence = 0;

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

  static byteArray(data) {
    return new Data('valid', ByteArrayType, data);
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

  static unavailable(message) {
    const data = new Data('unavailable', null, null);
    data.message = message;
    return data;
  }

  static brokenPipe() {
    return new Data('broken-pipe', null, null);
  }

  addWarning(warning) {
    this.warnings.push(warning);
    return this;
  }

  addInfo(info) {
    this.infos.push(info);
    return this;
  }

  withSequence(sequence) {
    this.sequence = sequence;
    return this;
  }

  addContext(key, value) {
    this.context[key] = value;
    return this;
  }

}

export default Data;