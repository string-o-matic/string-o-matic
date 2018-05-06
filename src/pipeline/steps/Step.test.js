import Step from './Step';
import Data from '../Data';
import {ByteArrayType, NullType, StringType} from '../Types';
import TextToBytes from './convert/TextToBytes';

class AddXStep extends Step {
  static supports = [StringType];
  calculate(input) {
    return Data.string(input.data + '_x');
  }
}

class BytesStep extends Step {
  static supports = [StringType, ByteArrayType];
  static input = ByteArrayType;
  prefs = { };
  calculate(input) {
    return Data.byteArray(new Uint8Array([input.data[0] + 1]));
  }
}

test('set next does not calculate and makes no calls to next step if no input has been set', () => {
  let current = new AddXStep();
  let next = new AddXStep();

  current.setNext(next);

  expect(current.next).toBe(next);
  expect(current.input).toBeNull();
  expect(current.output).toBeNull();
});

test('set next then set input passes input to next step', () => {
  let current = new AddXStep();

  let next = new AddXStep();
  next.setInput = jest.fn();

  let input = Data.string('a');
  current.setNext(next);
  current.setInput(input);

  expect(current.next).toBe(next);
  expect(current.input).toBe(input);
  expect(current.output.data).toBe('a_x');

  expect(next.setInput.mock.calls).toHaveLength(1);
  expect(next.setInput.mock.calls[0][0].data).toBe('a_x');
});

test('set next passes current output to next step', () => {
  let input = Data.string('a');
  let current = new AddXStep();
  current.setInput(input);

  let next = new AddXStep();
  next.setInput = jest.fn();

  current.setNext(next);

  expect(current.next).toBe(next);
  expect(current.input).toBe(input);
  expect(current.output.data).toBe('a_x');

  expect(next.setInput.mock.calls).toHaveLength(1);
  expect(next.setInput.mock.calls[0][0].data).toBe('a_x');
});

test('set next does nothing if the same step is given', () => {
  let input = Data.string('a');
  let current = new AddXStep();
  current.setInput(input);

  let next = new AddXStep();
  next.setInput = jest.fn();

  current.setNext(next);
  expect(current.next).toBe(next);
  expect(next.setInput.mock.calls).toHaveLength(1);

  current.setNext(next);
  expect(current.next).toBe(next);
  expect(next.setInput.mock.calls).toHaveLength(1);
});

test('step does not pass new input to next step if it\'s the same instance', () => {
  let input = Data.string('a');

  let current = new AddXStep();
  current.setInput(input);

  let next = new AddXStep();
  next.setInput = jest.fn();

  current.setNext(next);

  expect(current.next).toBe(next);
  expect(next.setInput.mock.calls).toHaveLength(1);

  current.setInput(input);

  expect(next.setInput.mock.calls).toHaveLength(1);
});

test('step passes new input to next step if it has changed', () => {
  let current = new AddXStep();
  current.setInput(Data.string('a'));

  let next = new AddXStep();
  next.setInput = jest.fn();
  next.calculate = jest.fn();
  next.getOutput = jest.fn();

  current.setNext(next);

  expect(current.next).toBe(next);
  expect(next.setInput.mock.calls).toHaveLength(1);
  expect(next.setInput.mock.calls[0][0].data).toBe('a_x');

  current.setInput(Data.string('b'));

  expect(next.setInput.mock.calls).toHaveLength(2);
  expect(next.setInput.mock.calls[0][0].data).toBe('a_x');
});

test('set next to null', () => {
  let current = new AddXStep();
  let next = new AddXStep();
  current.setNext(next);
  expect(current.next).toBe(next);
  current.setNext(null);
  expect(current.next).toBeNull();
});

test('set input does not recalculate if given same instance', () => {
  let input = Data.string('a');

  let current = new AddXStep();
  let next = new AddXStep();
  next.setInput = jest.fn();
  current.setNext(next);

  current.setInput(input);

  expect(current.output.data).toBe('a_x');
  expect(next.setInput.mock.calls).toHaveLength(1);

  input.data = 'b'; // cheating, data instances are supposed to be immutable
  current.setInput(input);

  expect(current.output.data).toBe('a_x');
  expect(next.setInput.mock.calls).toHaveLength(1);
});

test('set input recalculates if given same data so context and sequence are passed through', () => {
  let current = new AddXStep();
  let next = new AddXStep();
  next.setInput = jest.fn();
  current.setNext(next);

  current.setInput(Data.string('a').withSequence(100));

  expect(current.output.data).toBe('a_x');
  expect(current.output.sequence).toBe(100);
  expect(next.setInput.mock.calls).toHaveLength(1);

  current.setInput(Data.string('a').withSequence(101));

  expect(current.output.data).toBe('a_x');
  expect(current.output.sequence).toBe(101);
  expect(next.setInput.mock.calls).toHaveLength(2);
});

test('get output returns null if no input has been set', () => {
  let current = new AddXStep();
  expect(current.getOutput()).toBeNull();
});

test('get output returns expected output preserving sequence and context', () => {
  let sequence = 1001;
  let context = { a: 'z', b: 'y' };
  let current = new AddXStep();
  current.setInput(Data.string('a').withSequence(sequence).addContext('a', 'z').addContext('b', 'y'));
  let output = current.getOutput();
  expect(output.type).toBe(StringType);
  expect(output.data).toBe('a_x');
  expect(output.status).toBe('valid');
  expect(output.sequence).toBe(sequence);
  expect(output.context).toEqual(context);
});

test('get output preserves supplied context and merges context from the subclass', () => {
  let sequence = 1001;
  let context = { a: 'z', b: '*', c: '=' };
  let current = new AddXStep();
  current.calculate = (input) => {
    return Data.string(input.data + '_X').addContext('b', '*').addContext('c', '=');
  };
  current.setInput(Data.string('a').withSequence(sequence).addContext('a', 'z').addContext('b', 'y'));
  let output = current.getOutput();
  expect(output.type).toBe(StringType);
  expect(output.data).toBe('a_X');
  expect(output.status).toBe('valid');
  expect(output.sequence).toBe(sequence);
  expect(output.context).toEqual(context);
});

test('get output returns data.nul if input is null', () => {
  // TBD whether this is best but it would only happen if there's a bug in the step
  let current = new AddXStep();
  current.setInput(Data.string(null));
  let output = current.getOutput();
  expect(output.status).toBe('valid');
  expect(output.type).toBe(NullType);
});

test('get output returns broken pipe if input is not valid', () => {
  let current = new AddXStep();
  current.setInput(Data.invalid('a message'));
  let output = current.getOutput();
  expect(output.status).toBe('broken-pipe');
});

test('get output returns unsupported if input is not supported', () => {
  let current = new AddXStep();
  current.setInput(Data.byteArray(new Uint8Array([0])));
  let output = current.getOutput();
  expect(output.status).toBe('unsupported');
  expect(output.inputType).toBe(ByteArrayType);
});

test('get output catches unhandled exceptions from subclass calculate', () => {
  let current = new AddXStep();
  current.calculate = () => {
    throw Error('unhandled');
  };
  current.setInput(Data.string('a'));
  let output = current.getOutput();
  expect(output.status).toBe('bug');
});

test('get output creates a texttobytes step if input is string but step requires bytes', () => {
  let step = new BytesStep();
  step.setInput(Data.string('a')); // 0x61 when converted with default UTF-8 encoding
  let output = step.getOutput();
  expect(output.status).toBe('valid');
  expect(output.type).toBe(ByteArrayType);
  expect(output.data[0]).toBe(0x62);
  expect(step.convertStep).toBeInstanceOf(TextToBytes);
});

test('get output reuses a texttobytes step if input is string but step requires bytes', () => {
  let step = new BytesStep();

  step.setInput(Data.string('a'));
  let output = step.getOutput();
  expect(output.data[0]).toBe(0x62);
  let convertStep = step.convertStep;

  step.setInput(Data.string('b'));
  output = step.getOutput();
  expect(output.data[0]).toBe(0x63);
  expect(step.convertStep).toBe(convertStep);
});

test('get output removes texttobytes step if input type changes to supported type', () => {
  let step = new BytesStep();

  step.setInput(Data.string('a'));
  let output = step.getOutput();
  expect(output.data[0]).toBe(0x62);
  expect(step.convertStep).toBeInstanceOf(TextToBytes);

  step.setInput(Data.byteArray(new Uint8Array([0x62])));
  output = step.getOutput();
  expect(output.data[0]).toBe(0x63);
  expect(step.convertStep).toBeNull();
});

test('get output text to bytes uses preferences set direct to convert step', () => {
  let step = new BytesStep();

  step.setInput(Data.string('a'));
  let output = step.getOutput();
  expect(output.data[0]).toBe(0x62);

  step.convertStep.setSource('hex');

  step.setInput(Data.string('62'));
  output = step.getOutput();
  expect(output.data[0]).toBe(0x63);
});

test('get output text to bytes convert step inherits preferences instance from step', () => {
  let step = new BytesStep();

  step.setInput(Data.string('a'));
  let output = step.getOutput();
  expect(output.data[0]).toBe(0x62);

  step.prefs.source = 'hex';

  step.setInput(Data.string('62'));
  output = step.getOutput();
  expect(output.data[0]).toBe(0x63);
});

test('get output text to bytes convert step inherits default preferences instance from step', () => {
  let step = new BytesStep();
  step.prefs = { source: 'hex' };

  step.setInput(Data.string('61'));
  let output = step.getOutput();
  expect(output.data[0]).toBe(0x62);

  step.setInput(Data.string('62'));
  output = step.getOutput();
  expect(output.data[0]).toBe(0x63);
});
