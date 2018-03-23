import Step from '../Step';

class UpperCase extends Step {

  static title = 'Uppercase';

  calculate(input) {
    if (input == null || input.data == null) {
      return { type: 'String', data: null };
    } else {
      return { type: 'String', data: input.data.toUpperCase() };
    }
  }

}

export default UpperCase;
