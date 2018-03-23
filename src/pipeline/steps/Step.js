class Step {

  static title = 'Identity';

  output = null;

  setNext(step) {
    this.next = step;
    if (this.next) {
      this.next.setInput(this.getOutput());
    }
  }

  setInput(input) {
    console.log(this.constructor.name + ": setInput", input);
    this.input = input;
    this.output = null;
    if (this.next) {
      this.next.setInput(this.getOutput());
    }
  }

  calculate(input) {
    return input;
  }

  getOutput() {
    if (!this.output && this.input) {
      this.output = this.calculate(this.input);
    }
    console.log(this.constructor.name + ": getOutput", { input: this.input, output: this.output });
    return this.output;
  }

}

export default Step;
