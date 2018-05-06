import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StepTop } from '../Common';
import './StepSelector.css';
import StepRegistry from './steps/StepRegistry';

class StepSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {'filter': ''};
  }

  render() {
    let filteredCategories = { };
    const filter = this.state.filter.toLowerCase();
    Object.keys(StepRegistry.categories).forEach(categoryName => {
      const category = StepRegistry.categories[categoryName];
      category.forEach(step => {
        if (filter.length === 0 ||
          (step.root && step.variants.filter((variant) => variant.title.toLowerCase().indexOf(filter.toLowerCase()) > -1).length > 0) ||
          (!step.root && step.title.toLowerCase().indexOf(filter.toLowerCase()) > -1)) {
          if (!filteredCategories[categoryName]) {
            filteredCategories[categoryName] = [];
          }
          filteredCategories[categoryName].push(step);
        }
      });
    });
    let steps = <p className="no-matches">No matching steps!</p>;
    if (Object.keys(filteredCategories).length > 0) {
      steps = Object.keys(filteredCategories).map((name) => {
        return (<div key={name} className="category row">
          <div className="col-md-2">
            <h4>{name}</h4>
          </div>
          <div className="col-md-10">
            {
              filteredCategories[name].map((step, si) => {
                if (step.root) {
                  let supportedVariants = 0;
                  const variants = step.variants.map((variant, vi) => {
                    let className = 'btn';
                    if (variant.supports.indexOf(this.props.type) === -1) {
                      className += ' fade';
                    } else {
                      supportedVariants++;
                    }
                    return <button key={vi} className={className} onClick={this.addStep.bind(this, variant)}>{variant.variantTitle}</button>;
                  });
                  return (
                    <div className={'btn-group' + (supportedVariants === 0 ? ' fade' : '')} key={si}>
                      <div className="btn-group-label">{step.root}</div>
                      {variants}
                    </div>
                  );
                } else {
                  let className = 'btn';
                  if (step.supports.indexOf(this.props.type) === -1) {
                    className += ' fade';
                  }
                  return <button key={si} className={className} onClick={this.addStep.bind(this, step)}>{step.title}</button>;
                }
              })
            }
          </div>
        </div>);
      });
    }

    return (
      <div className="step-selector">
        <StepTop/>
        <div className="body">
          <div className="row">
            <div className="col-xs-12">
              <div className="search pull-right">
                <input type="text" placeholder="Search" onChange={this.onSearchChange}/><button className="delete" onClick={this.clearSearch}><span className="ion-md-close"/></button>
              </div>
            </div>
          </div>
          {steps}
        </div>
      </div>
    );
  }

  onSearchChange = (e) => {
    this.setState({'filter': e.target.value});
  };

  clearSearch = () => {
    this.setState({'filter': ''});
  };

  addStep(step) {
    this.props.addStep(new step());
  }

}

StepSelector.propTypes = {
  addStep: PropTypes.func.isRequired,
  type: PropTypes.func
};

export default StepSelector;
