import Step from './Step';

class StringReverseStep extends Step {

  title() {
    return 'Reverse String'
  }

  consumes() {
    return ['String']
  }

  produces() {
    return { 'String': 'String' }
  }

  calculate(input) {
    if (input == null || input.data == null) {
      return { type: 'String', data: null };
    } else {
      return { type: 'String', data: input.data.split("").reverse().join("") };
    }
  }

}

export default StringReverseStep;
