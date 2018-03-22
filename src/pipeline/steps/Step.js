class Step {

  output = null;

  setNext(step) {
    this.next = step;
    if (this.next) {
      this.next.setInput(this.getOutput());
    }
  }

  setInput(input) {
    this.input = input;
    this.output = null;
    if (this.next) {
      this.next.setInput(this.getOutput());
    }
  }

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

  getOutput() {
    if (!this.output && this.input) {
      this.output = this.calculate(this.input);
    }
    return this.output;
  }

}

export default Step;
