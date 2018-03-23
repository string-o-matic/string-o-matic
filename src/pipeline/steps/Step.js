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
      if (this.input.type === 'error' || this.input.type === 'interrupt') {
        this.output = { type: 'interrupt' }
      } else {
        try {
          this.output = this.calculate(this.input);
        } catch (e) {
          console.error(this.constructor.name + ' calculation failed', {input: this.input, error: e});
          this.output = {type: 'error', error: "Whoops! This value couldn't be calculated. You've found a bug."}
        }
      }
    }
    console.log(this.constructor.name + ": getOutput", { input: this.input, output: this.output });
    return this.output;
  }

}

export default Step;
