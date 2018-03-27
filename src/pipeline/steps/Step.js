import Data from '../Data';
import {NullType} from '../Types';

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

  getInput() {
    return this.input;
  }

  getOutput() {
    if (!this.output && this.input) {
      if (this.input.status !== 'valid') {
        this.output = Data.brokenPipe();
      } else if (this.input.type == null || this.input.type === NullType || this.input.data == null) {
        this.output = Data.nul();
      } else if (this.constructor.supports.indexOf(this.input.type) < 0) {
        this.output = Data.unsupported();
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
