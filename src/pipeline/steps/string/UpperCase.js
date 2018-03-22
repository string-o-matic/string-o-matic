import Step from '../Step';

class UpperCase extends Step {

  title() {
    return 'Uppercase'
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
      return { type: 'String', data: input.data.toUpperCase() };
    }
  }

}

export default UpperCase;
