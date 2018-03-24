import Data from '../Data';

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
      if (this.input.status !== 'valid') {
        this.output = Data.brokenPipe();
      } else {
        try {
          this.output = this.calculate(this.input);
        } catch (e) {
          console.error(this.constructor.name + ' calculation failed', {input: this.input, error: e});
          this.output = Data.bug();
        }
      }
    }
    console.log(this.constructor.name + ": getOutput", { input: this.input, output: this.output });
    return this.output;
  }

}

export default Step;
