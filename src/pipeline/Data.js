class Data {

  status = null;
  type = null;
  data = null;

  constructor(status, type, data) {
    this.status = status;
    this.type = type;
    this.data = data;
  }

  static string(data) {
    return new Data('valid', 'String', data);
  }

  static byteStringBuffer(data) {
    return new Data('valid', 'ByteStringBuffer', data);
  }

  static valid(type, data) {
    return new Data('valid', type, data);
  }

  static nul() {
    return new Data('valid', 'null', null);
  }

  static bug() {
    return new Data('bug', null, null);
  }

  static brokenPipe() {
    return new Data('broken-pipe', null, null);
  }

}

export default Data;