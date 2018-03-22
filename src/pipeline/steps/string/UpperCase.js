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

  getOutput() {
    if (this.input == null || this.input.data == null) {
      return { type: 'String', data: null };
    } else {
      return { type: 'String', data: this.input.data.toUpperCase() };
    }
  }

}

export default UpperCase;
