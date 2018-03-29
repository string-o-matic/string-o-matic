import Pipeline from '../Pipeline';
import Data from '../Data';
import {NullType} from '../Types';

import '../StepComponent.css';

// TODO fix out-of-order promise resolution
class Step {

  static title = 'Identity';

  constructor() {
    this.key = this.constructor.name + '-' + (Pipeline.stepCount++);
  }

  log(message, object) {
    console.log(this.key + ': ' + message, object);
  }

  error(message, object) {
    console.error(this.key + ': ' + message, object);
  }

  setNext(next) {
    if (next !== this.next) {
      this.next = next;
      this.passInput();
    }
  }

  setInput(input) {
    if (input !== this.input) {
      this.output = null;
      this.input = input;
      this.passInput();
      if (input.then) {
        this.log('setInput (Promise)');
        input.then(result => {
          this.log('setInput (Promise resolved)', result);
          this.setInput(result)
        });
      } else {
        this.log('setInput', input);
      }
    }
  }

  getInput() {
    return this.input;
  }

  getOutput() {
    if (!this.output && this.input) {
      if (this.input.then) {
        return new Promise(resolve => {
          this.input.then(input => {
            resolve(this.calculate(input));
          });
        });
      } else if (this.input.status !== 'valid') {
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
          this.error('Calculation failed', {input: this.input, error: e});
          this.output = Data.bug();
        }
      }
    }
    this.log('getOutput', { input: this.input, output: this.output });
    return this.output;
  }

  /**
   * Subclasses override this to do their actual calculation. Only a valid Data instance will be
   * passed - no promises or errors. A promise may be returned for async calculations.
   * @param {Data} input
   * @returns {Data|Promise}
   */
  calculate(input) {
    return input;
  }

  passInput() {
    if (this.next) {
      var output = this.getOutput();
      if (output.then) {
        this.next.setInput(new Promise(resolve => {
          output.then(input => resolve(input));
        }));
      } else {
        this.next.setInput(output);
      }
    }
  }

}

export default Step;
