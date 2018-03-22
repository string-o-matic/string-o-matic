class Step {

  setNext(step) {
    this.next = step;
    if (this.next) {
      this.next.setInput(this.getOutput());
    }
  }

  setInput(input) {
    console.log('step set input', input);
    this.input = input;
    if (this.next) {
      console.log('pass to next', this.next);
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

  getOutput() {
    console.log('DEFAULT GET OUTPUT');
    return this.input;
  }

}

export default Step;
