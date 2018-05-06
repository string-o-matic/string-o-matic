import StepRegistry from './StepRegistry';
import Step from './Step';

// Tests all registered steps adhere to a basic contract

let titles = [];
let stepSuper = new Step();

const testStep = (step, variant) => {
  const stepInstance = new step();

  it(step.name + ' declares a unique title', () => {
    expect(step.title).not.toBeNull();
    expect(typeof step.title).toBe('string');
    expect(step.title.length).toBeGreaterThan(0);
    expect(titles.indexOf(step.title)).toBe(-1);
    titles.push(step.title);
  });

  if (variant) {
    it(step.name + ' declares a variant title if required', () => {
      expect(step.variantTitle).not.toBeNull();
      expect(typeof step.variantTitle).toBe('string');
      expect(step.variantTitle.length).toBeGreaterThan(0);
    });
  }

  it(step.name + ' declares supported types', () => {
    expect(Array.isArray(step.supports)).toBe(true);
    step.supports.forEach(type => {
      expect(type.display).not.toBeNull();
    });
  });

  it(step.name + ' declares expected output type', () => {
    expect(step.output).not.toBeNull();
    expect(step.output.display).not.toBeNull();
  });

  if (step.input) {
    it(step.name + ' declares support for required input type if present', () => {
      expect(step.input.display).not.toBeNull();
      expect(step.supports.indexOf(step.input)).not.toBe(-1);
    });
  }

  it(step.name + ' overrides calculate()', () => {
    expect(stepInstance.calculate).not.toBe(stepSuper.calculate);
  });

  it(step.name + ' does not override setInput()', () => {
    expect(stepInstance.setInput).toBe(stepSuper.setInput);
  });

  it(step.name + ' does not override getOutput()', () => {
    expect(stepInstance.getOutput).toBe(stepSuper.getOutput);
  });

  it(step.name + ' does not override passInput()', () => {
    expect(stepInstance.passInput).toBe(stepSuper.passInput);
  });

  it(step.name + ' does not override setNext()', () => {
    expect(stepInstance.setNext).toBe(stepSuper.setNext);
  });
};

describe('test registry', () => {
  Object.keys(StepRegistry.categories).forEach(categoryName => {
    const category = StepRegistry.categories[categoryName];
    category.forEach(node => {
      if (node.root) {
        node.variants.forEach(step => {
          testStep(step, true);
        });
      } else {
        testStep(node, false);
      }
    });
  });
});
