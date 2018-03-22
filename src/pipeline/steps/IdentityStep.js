import Step from './Step';

class IdentityStep extends Step {

  title() {
    return 'Identity'
  }

  consumes() {
    return ['*']
  }

  produces() {
    return { '*': '*' }
  }

  calculate(input) {
    return input;
  }

}

export default IdentityStep;
