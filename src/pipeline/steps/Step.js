import Data from '../Data';
import {NullType} from '../Types';
import Globals from '../../Globals';
import '../StepComponent.css';
/* global process */

class StepCounter {
  /**
   * This is used to give each step an incrementing key, although if steps are deleted or reordered their count
   * gets out of sync. Mainly helps development.
   * @type {number}
   */
  static count = 1;
}

/**
 * Superclass for transformation steps in the pipeline. The superclass handles input chaining, promise
 * resolution and error handling, delegating only calculation to subclasses.
 */
class Step {

  static title = 'Identity';

  constructor() {
    this.key = this.constructor.name + '-' + (StepCounter.count++);
  }

  log(message, object) {
    console.log(this.key + ': ' + message, object);
  }

  error(message, object) {
    console.error(this.key + ': ' + message, object);
  }

  /**
   * Set the next step in the pipeline. The step will be passed this step's output as its input.
   * @param {Step} next
   */
  setNext(next) {
    if (next !== this.next) {
      this.next = next;
      this.passInput();
    }
  }

  /**
   * Set new input from the previous step in the pipeline. If input has changed the output is
   * wiped and recalculation steps. Input can be a promise, indicating new input is being
   * calculated by the previous step.
   * @param {Data|Promise} input
   */
  setInput(input) {
    if (input !== this.input) {
      this.log('setInput (' + input.constructor.name + ')', input);
      this.input = input;
      if (this.input.then) {
        this.output = new Promise(resolve => {
          this.input.then(result => {
            this.log('setInput (Resolved)', result);
            this.input = result;
            this.log('Calling _getOutputForData from input resolve');
            resolve(this._getOutputForData(result));
          });
        });
      } else {
        this.output = null;
      }
      this.passInput();
    }
  }

  /**
   * Prompts recalculation of output when necessary and returns either the new calculated output or
   * a promise. If the input has not yet resolved, or the calculate function is async, a promise is
   * returned.
   * @returns {*}
   */
  getOutput() {
    this.log('getOutput', { input: this.input });
    if (!this.output && this.input) {
      if (this.input.then) {
        // A listener has already been attached at this point
        this.error('Unexpected state! Output should never be null if input is a promise.');
        this.output = Data.bug();
      } else {
        this.log('Calling _getOutputForData direct');
        this._getOutputForData(this.input);
      }
    }
    return this.output;
  }

  /**
   * Called when resolved input data is available. Checks error/null conditions then passes the data
   * into the subclass {@link calculate} function.
   * @param {Data} input
   * @returns {Data|Promise}
   * @private
   */
  _getOutputForData(input) {
    if (input.status !== 'valid') {
      this.output = Data.brokenPipe();
    } else if (input.type == null || input.type === NullType || input.data == null) {
      this.output = Data.nul();
    } else if (this.constructor.supports.indexOf(input.type) < 0) {
      this.output = Data.unsupported(input.type);
    } else {
      try {
        this.log('Calculate', input);
        this.output = this.calculate(input);
        if (this.output.then) {
          // Replacing output with actual data avoids redundant updates of the component
          this.output.then(output => {
            if (input.sequence === Globals.inputSequence) {
              this.output = output.withSequence(input.sequence);
            }
          });
        } else {
          this.output.withSequence(input.sequence);
          this.output.context = Object.assign(this.output.context, input.context);
        }
      } catch (e) {
        this.error('Calculation failed', {input: input, error: e});
        this.output = Data.bug();
        if (process.env.NODE_ENV !== 'production') {
          throw e;
        }
      }
    }
    return this.output;
  }

  /**
   * Subclasses override this to do their actual calculation. Only a valid Data instance will be
   * passed - no promises or errors. A promise may be returned for async calculations. Subclasses
   * must not reject the promises they return, they must resolve them with {@link Data.bug} if
   * necessary.
   * @param {Data} input
   * @returns {Data|Promise}
   * @protected
   */
  calculate(input) {
    return input;
  }

  /**
   * Passes this step's output to the next step. Always passes something, which will be a promise
   * if either this step's input is a promise or the calculation is async.
   */
  passInput() {
    if (this.next) {
      const output = this.getOutput();
      if (output.then) {
        this.next.setInput(new Promise(resolve => {
          output.then(input => {
            if (input.sequence === Globals.inputSequence) {
              resolve(input);
            }
          });
        }));
      } else {
        this.next.setInput(output);
      }
    }
  }

}

export default Step;
