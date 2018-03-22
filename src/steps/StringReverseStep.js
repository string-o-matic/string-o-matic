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

  getOutput() {
    if (this.input == null || this.input.data == null) {
      return { type: 'String', data: null };
    } else {
      return { type: 'String', data: this.input.data.split("").reverse().join("") };
    }
  }

}

export default StringReverseStep;
