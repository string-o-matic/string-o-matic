import Step from '../Step';

class Reverse extends Step {

  static title = 'Reverse';

  calculate(input) {
    if (input == null || input.data == null) {
      return { type: 'String', data: null };
    } else {
      return { type: 'String', data: input.data.split("").reverse().join("") };
    }
  }

}

export default Reverse;
