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

  getOutput() {
    return this.input;
  }

}

export default IdentityStep;
