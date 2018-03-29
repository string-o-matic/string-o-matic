import Data from '../Data';
import {NullType} from '../Types';

import '../StepComponent.css';

// this.input is always a Data object
// this.output can be a Promise or a Data object. // TODO always use promises?
// TODO include input in output object and discard it if it doesn't match current input, to avoid out-of-order promise resolution problems
class Step {

  static title = 'Identity';

  output = null;

  setNext(step) {
    this.next = step;
    this.passInput();
  }

  setInput(input) {
    console.log(this.constructor.name + ": setInput", input);
    this.input = input;
    this.output = null;
    this.passInput();
  }

  passInput() {
    if (this.next) {
      var output = this.getOutput();
      if (output.then) {
        output.then(data => this.next.setInput(data));
      } else {
        this.next.setInput(this.getOutput());
      }
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
          if (this.output.then) {
            this.output.then(output => this.output = output);
          }
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
