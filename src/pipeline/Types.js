
class NullType {
  static ref = 'NULL';
  static display = 'null';
  static displayPlural = 'nulls';
}

class StringType {
  static ref = 'STRING';
  static display = 'string';
  static displayPlural = 'strings';
}

class ByteStringBufferType {
  static ref = 'BYTESTRINGBUFFER';
  static display = 'byte array';
  static displayPlural = 'byte arrays';
}

export { NullType, StringType, ByteStringBufferType };